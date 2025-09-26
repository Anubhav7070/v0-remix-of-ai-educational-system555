import pandas as pd
from glob import glob
import os
import tkinter as tk
from tkinter import *
import csv


def subjectchoose(text_to_speech):
    def calculate_attendance():
        Subject = tx.get().strip()
        if Subject == "":
            t = 'Please enter the subject name.'
            text_to_speech(t)
            return

        # Find attendance CSVs
        filenames = glob(f"Attendance\\{Subject}\\{Subject}*.csv")
        if not filenames:
            text_to_speech("No attendance files found for this subject.")
            return

        # Merge all CSVs
        df_list = [pd.read_csv(f) for f in filenames]
        newdf = df_list[0]
        for i in range(1, len(df_list)):
            newdf = newdf.merge(df_list[i], how="outer")

        newdf.fillna(0, inplace=True)

        # Calculate attendance %
        newdf["Attendance"] = 0
        for i in range(len(newdf)):
            mean_val = newdf.iloc[i, 2:-1].mean()
            newdf.loc[i, "Attendance"] = str(int(round(mean_val * 100))) + '%'

        out_path = f"Attendance\\{Subject}\\attendance.csv"
        newdf.to_csv(out_path, index=False)

        # Display attendance in new window
        root = tk.Toplevel()
        root.title("Attendance of " + Subject)
        root.configure(background="black")

        with open(out_path) as file:
            reader = csv.reader(file)
            r = 0
            for col in reader:
                c = 0
                for row in col:
                    label = tk.Label(
                        root,
                        width=10,
                        height=1,
                        fg="yellow",
                        font=("times", 15, " bold "),
                        bg="black",
                        text=row,
                        relief=tk.RIDGE,
                    )
                    label.grid(row=r, column=c)
                    c += 1
                r += 1

        print(newdf)

    def Attf():
        sub = tx.get().strip()
        if sub == "":
            text_to_speech("Please enter the subject name!!!")
        else:
            path = f"Attendance\\{sub}"
            if os.path.exists(path):
                os.startfile(path)
            else:
                text_to_speech("No such subject folder found.")

    # Main subject window
    subject = tk.Tk()
    subject.title("Subject...")
    subject.geometry("580x320")
    subject.resizable(0, 0)
    subject.configure(background="black")

    titl = tk.Label(subject, bg="black", relief=RIDGE, bd=10, font=("arial", 30))
    titl.pack(fill=X)

    titl = tk.Label(
        subject,
        text="Which Subject of Attendance?",
        bg="black",
        fg="green",
        font=("arial", 25),
    )
    titl.place(x=100, y=12)

    attf = tk.Button(
        subject,
        text="Check Sheets",
        command=Attf,
        bd=7,
        font=("times new roman", 15),
        bg="black",
        fg="yellow",
        height=2,
        width=10,
        relief=RIDGE,
    )
    attf.place(x=360, y=170)

    sub = tk.Label(
        subject,
        text="Enter Subject",
        width=10,
        height=2,
        bg="black",
        fg="yellow",
        bd=5,
        relief=RIDGE,
        font=("times new roman", 15),
    )
    sub.place(x=50, y=100)

    tx = tk.Entry(
        subject,
        width=15,
        bd=5,
        bg="black",
        fg="yellow",
        relief=RIDGE,
        font=("times", 30, "bold"),
    )
    tx.place(x=190, y=100)

    fill_a = tk.Button(
        subject,
        text="View Attendance",
        command=calculate_attendance,
        bd=7,
        font=("times new roman", 15),
        bg="black",
        fg="yellow",
        height=2,
        width=12,
        relief=RIDGE,
    )
    fill_a.place(x=195, y=170)

    subject.mainloop()
