import tkinter as tk
from tkinter import *
import os, cv2
import shutil
import csv
import numpy as np
from PIL import ImageTk, Image
import pandas as pd
import datetime
import time
import tkinter.font as font
import pyttsx3

# project module (must exist in same project)
import show_attendance
import takeImage
import trainImage
import automaticAttedance

def text_to_speech(user_text):
    engine = pyttsx3.init()
    engine.say(user_text)
    engine.runAndWait()


haarcasecade_path = "haarcascade_frontalface_default.xml"
trainimagelabel_path = "./TrainingImageLabel/Trainner.yml"
trainimage_path = "./TrainingImage"   # fixed to local relative path
os.makedirs(trainimage_path, exist_ok=True)

studentdetail_path = "./StudentDetails/studentdetails.csv"
attendance_path = "Attendance"
os.makedirs(attendance_path, exist_ok=True)


# main window
window = Tk()
window.title("Face Recognizer")
window.geometry("1280x720")
dialog_title = "QUIT"
dialog_text = "Are you sure want to close?"
window.configure(background="#1c1c1c")  # Dark theme


# to destroy small error window
def del_sc1():
    try:
        sc1.destroy()
    except Exception:
        pass


# error message for missing enrollment/name - use Toplevel so we don't create another root
def err_screen():
    global sc1
    sc1 = tk.Toplevel(window)
    sc1.geometry("400x110")
    # optional icon - wrap in try/except if file missing
    try:
        sc1.iconbitmap("AMS.ico")
    except Exception:
        pass
    sc1.title("Warning!!")
    sc1.configure(background="#1c1c1c")
    sc1.resizable(0, 0)
    tk.Label(
        sc1,
        text="Enrollment & Name required!!!",
        fg="yellow",
        bg="#1c1c1c",
        font=("Verdana", 16, "bold"),
    ).pack(pady=(10, 0))
    tk.Button(
        sc1,
        text="OK",
        command=del_sc1,
        fg="yellow",
        bg="#333333",
        width=9,
        height=1,
        activebackground="red",
        font=("Verdana", 12, "bold"),
    ).place(x=140, y=60)


def testVal(inStr, acttyp):
    # allow only digits on insert
    if acttyp == "1":  # insert
        if not inStr.isdigit():
            return False
    return True


# Load and show logo safely
try:
    logo = Image.open("UI_Image/0001.png")
    logo = logo.resize((50, 47), Image.LANCZOS)
    logo1 = ImageTk.PhotoImage(logo)
    titl = tk.Label(window, bg="#1c1c1c", relief=RIDGE, bd=10, font=("Verdana", 30, "bold"))
    titl.pack(fill=X)
    l1 = tk.Label(window, image=logo1, bg="#1c1c1c")
    l1.place(x=470, y=10)
except Exception:
    # fallback if image missing
    titl = tk.Label(window, bg="#1c1c1c", relief=RIDGE, bd=10, font=("Verdana", 30, "bold"))
    titl.pack(fill=X)


titl_text = tk.Label(
    window, text="CLASS VISION", bg="#1c1c1c", fg="yellow", font=("Verdana", 27, "bold"),
)
titl_text.place(x=525, y=12)

welcome_label = tk.Label(
    window,
    text="Welcome to CLASS VISION",
    bg="#1c1c1c",
    fg="yellow",
    bd=10,
    font=("Verdana", 35, "bold"),
)
welcome_label.pack(pady=(40, 10))


# Load UI icons if present, otherwise skip
def safe_load_image(path, size=None):
    try:
        im = Image.open(path)
        if size:
            im = im.resize(size, Image.LANCZOS)
        return ImageTk.PhotoImage(im)
    except Exception:
        return None


ri_img = safe_load_image("UI_Image/register.png", size=(120, 120))
if ri_img:
    label1 = Label(window, image=ri_img, bg="#1c1c1c")
    label1.image = ri_img
    label1.place(x=100, y=270)

ai_img = safe_load_image("UI_Image/attendance.png", size=(120, 120))
if ai_img:
    label2 = Label(window, image=ai_img, bg="#1c1c1c")
    label2.image = ai_img
    label2.place(x=980, y=270)

vi_img = safe_load_image("UI_Image/verifyy.png", size=(120, 120))
if vi_img:
    label3 = Label(window, image=vi_img, bg="#1c1c1c")
    label3.image = vi_img
    label3.place(x=600, y=270)


def TakeImageUI():
    ImageUI = Tk()
    ImageUI.title("Take Student Image..")
    ImageUI.geometry("780x480")
    ImageUI.configure(background="#1c1c1c")
    ImageUI.resizable(0, 0)
    titl_inner = tk.Label(ImageUI, bg="#1c1c1c", relief=RIDGE, bd=10, font=("Verdana", 30, "bold"))
    titl_inner.pack(fill=X)

    titl2 = tk.Label(
        ImageUI, text="Register Your Face", bg="#1c1c1c", fg="green", font=("Verdana", 30, "bold"),
    )
    titl2.place(x=270, y=12)

    a = tk.Label(
        ImageUI,
        text="Enter the details",
        bg="#1c1c1c",
        fg="yellow",
        bd=10,
        font=("Verdana", 24, "bold"),
    )
    a.place(x=280, y=75)

    # Enrollment no
    lbl1 = tk.Label(
        ImageUI,
        text="Enrollment No",
        width=10,
        height=2,
        bg="#1c1c1c",
        fg="yellow",
        bd=5,
        relief=RIDGE,
        font=("Verdana", 14),
    )
    lbl1.place(x=120, y=130)
    txt1 = tk.Entry(
        ImageUI,
        width=17,
        bd=5,
        validate="key",
        bg="#333333",
        fg="yellow",
        relief=RIDGE,
        font=("Verdana", 18, "bold"),
    )
    txt1.place(x=250, y=130)
    txt1["validatecommand"] = (txt1.register(testVal), "%P", "%d")

    # name
    lbl2 = tk.Label(
        ImageUI,
        text="Name",
        width=10,
        height=2,
        bg="#1c1c1c",
        fg="yellow",
        bd=5,
        relief=RIDGE,
        font=("Verdana", 14),
    )
    lbl2.place(x=120, y=200)
    txt2 = tk.Entry(
        ImageUI,
        width=17,
        bd=5,
        bg="#333333",
        fg="yellow",
        relief=RIDGE,
        font=("Verdana", 18, "bold"),
    )
    txt2.place(x=250, y=200)

    lbl3 = tk.Label(
        ImageUI,
        text="Notification",
        width=10,
        height=2,
        bg="#1c1c1c",
        fg="yellow",
        bd=5,
        relief=RIDGE,
        font=("Verdana", 14),
    )
    lbl3.place(x=120, y=270)

    message = tk.Label(
        ImageUI,
        text="",
        width=32,
        height=2,
        bd=5,
        bg="#333333",
        fg="yellow",
        relief=RIDGE,
        font=("Verdana", 14, "bold"),
    )
    message.place(x=250, y=270)

    def take_image():
        l1 = txt1.get().strip()
        l2 = txt2.get().strip()
        if l1 == "" or l2 == "":
            err_screen()
            return
        # call your takeImage module (must exist)
        takeImage.TakeImage(
            l1,
            l2,
            haarcasecade_path,
            trainimage_path,
            message,
            err_screen,
            text_to_speech,
        )
        txt1.delete(0, "end")
        txt2.delete(0, "end")

    takeImg = tk.Button(
        ImageUI,
        text="Take Image",
        command=take_image,
        bd=10,
        font=("Verdana", 18, "bold"),
        bg="#333333",
        fg="yellow",
        height=2,
        width=12,
        relief=RIDGE,
    )
    takeImg.place(x=130, y=350)

    def train_image():
        # call your trainImage module (must exist)
        trainImage.TrainImage(
            haarcasecade_path,
            trainimage_path,
            trainimagelabel_path,
            message,
            text_to_speech,
        )

    trainImg = tk.Button(
        ImageUI,
        text="Train Image",
        command=train_image,
        bd=10,
        font=("Verdana", 18, "bold"),
        bg="#333333",
        fg="yellow",
        height=2,
        width=12,
        relief=RIDGE,
    )
    trainImg.place(x=360, y=350)

    ImageUI.mainloop()


# Register button on main window
btn_register = tk.Button(
    window,
    text="Register a new student",
    command=TakeImageUI,
    bd=10,
    font=("Verdana", 16),
    bg="black",
    fg="yellow",
    height=2,
    width=17,
)
btn_register.place(x=100, y=520)


def automatic_attedance():
    # call your automatic attendance module
    automaticAttedance.subjectChoose(text_to_speech)


btn_take_attend = tk.Button(
    window,
    text="Take Attendance",
    command=automatic_attedance,
    bd=10,
    font=("Verdana", 16),
    bg="black",
    fg="yellow",
    height=2,
    width=17,
)
btn_take_attend.place(x=600, y=520)


def view_attendance():
    # call your show attendance module
    show_attendance.subjectchoose(text_to_speech)


btn_view_attend = tk.Button(
    window,
    text="View Attendance",
    command=view_attendance,
    bd=10,
    font=("Verdana", 16),
    bg="black",
    fg="yellow",
    height=2,
    width=17,
)
btn_view_attend.place(x=1000, y=520)


def on_exit():
    # optional confirmation
    if tk.messagebox.askokcancel(dialog_title, dialog_text):
        window.destroy()


btn_exit = tk.Button(
    window,
    text="EXIT",
    bd=10,
    command=on_exit,
    font=("Verdana", 16),
    bg="black",
    fg="yellow",
    height=2,
    width=17,
)
btn_exit.place(x=600, y=660)


window.mainloop()
