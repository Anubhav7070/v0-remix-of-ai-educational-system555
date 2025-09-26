import tkinter as tk
from tkinter import *
import os, cv2, csv
import pandas as pd
import datetime, time


haarcasecade_path = "haarcascade_frontalface_default.xml"
trainimagelabel_path = "TrainingImageLabel\\Trainner.yml"
trainimage_path = "TrainingImage"
studentdetail_path = "StudentDetails\\studentdetails.csv"
attendance_path = "Attendance"


def subjectChoose(text_to_speech):
    def FillAttendance():
        sub = tx.get().strip()
        if sub == "":
            text_to_speech("Please enter the subject name!!!")
            return

        try:
            # recognizer
            recognizer = cv2.face.LBPHFaceRecognizer_create()
            recognizer.read(trainimagelabel_path)

            facecasCade = cv2.CascadeClassifier(haarcasecade_path)
            df = pd.read_csv(studentdetail_path)

            cam = cv2.VideoCapture(0)
            font = cv2.FONT_HERSHEY_SIMPLEX
            col_names = ["Enrollment", "Name"]
            attendance = pd.DataFrame(columns=col_names)

            # capture for 20 seconds
            future = time.time() + 20
            while True:
                ret, im = cam.read()
                if not ret:
                    break
                gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
                faces = facecasCade.detectMultiScale(gray, 1.2, 5)

                for (x, y, w, h) in faces:
                    Id, conf = recognizer.predict(gray[y:y+h, x:x+w])
                    if conf < 70:
                        name = df.loc[df["Enrollment"] == Id]["Name"].values
                        if len(name) > 0:
                            name = str(name[0])
                        else:
                            name = "Unknown"

                        attendance.loc[len(attendance)] = [Id, name]

                        cv2.rectangle(im, (x, y), (x+w, y+h), (0, 260, 0), 4)
                        cv2.putText(im, f"{Id}-{name}", (x, y-10), font, 1, (255, 255, 0), 2)
                    else:
                        cv2.rectangle(im, (x, y), (x+w, y+h), (0, 25, 255), 4)
                        cv2.putText(im, "Unknown", (x, y-10), font, 1, (0, 25, 255), 2)

                if time.time() > future:
                    break

                attendance = attendance.drop_duplicates(["Enrollment"], keep="first")
                cv2.imshow("Filling Attendance...", im)
                if cv2.waitKey(30) & 0xFF == 27:  # ESC to exit
                    break

            # save file
            ts = time.time()
            date = datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d")
            timeStamp = datetime.datetime.fromtimestamp(ts).strftime("%H-%M-%S")

            path = os.path.join(attendance_path, sub)
            os.makedirs(path, exist_ok=True)

            fileName = f"{path}/{sub}_{date}_{timeStamp}.csv"
            attendance[date] = 1  # mark presence
            attendance.to_csv(fileName, index=False)

            cam.release()
            cv2.destroyAllWindows()

            msg = f"Attendance Filled Successfully for {sub}"
            Notifica.configure(
                text=msg,
                bg="black",
                fg="yellow",
                width=33,
                relief=RIDGE,
                bd=5,
                font=("times", 15, "bold"),
            )
            text_to_speech(msg)
            Notifica.place(x=20, y=250)

            # show attendance in new window
            root = tk.Toplevel(subject)
            root.title("Attendance of " + sub)
            root.configure(background="black")

            with open(fileName, newline="") as file:
                reader = csv.reader(file)
                for r, col in enumerate(reader):
                    for c, row in enumerate(col):
                        label = tk.Label(
                            root,
                            width=12,
                            height=1,
                            fg="yellow",
                            font=("times", 15, " bold "),
                            bg="black",
                            text=row,
                            relief=tk.RIDGE,
                        )
                        label.grid(row=r, column=c)

        except cv2.error:
            text_to_speech("Model not found. Please train the model first.")
        except FileNotFoundError:
            text_to_speech("Student details file missing.")
        except Exception as e:
            text_to_speech(f"Error: {str(e)}")
            cv2.destroyAllWindows()

    # GUI
    global subject
    subject = Tk()
    subject.title("Subject...")
    subject.geometry("580x320")
    subject.resizable(0, 0)
    subject.configure(background="black")

    titl = tk.Label(subject, bg="black", relief=RIDGE, bd=10, font=("arial", 30))
    titl.pack(fill=X)
    titl = tk.Label(
        subject,
        text="Enter the Subject Name",
        bg="black",
        fg="green",
        font=("arial", 25),
    )
    titl.place(x=160, y=12)

    global Notifica
    Notifica = tk.Label(
        subject,
        text="",
        bg="black",
        fg="yellow",
        width=33,
        height=2,
        font=("times", 15, "bold"),
    )

    def Attf():
        sub = tx.get().strip()
        if sub == "":
            text_to_speech("Please enter the subject name!!!")
        else:
            folder = os.path.join(attendance_path, sub)
            if os.path.exists(folder):
                os.startfile(folder)
            else:
                text_to_speech("No attendance records for this subject.")

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

    sub_lbl = tk.Label(
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
    sub_lbl.place(x=50, y=100)

    global tx
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
        text="Fill Attendance",
        command=FillAttendance,
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
