import csv
import os
import cv2
import numpy as np

def TakeImage(l1, l2, haarcasecade_path, trainimage_path, message, err_screen, text_to_speech):
    if not l1 and not l2:
        t = "Please enter your Enrollment Number and Name."
        text_to_speech(t)
        return
    elif not l1:
        t = "Please enter your Enrollment Number."
        text_to_speech(t)
        return
    elif not l2:
        t = "Please enter your Name."
        text_to_speech(t)
        return

    Enrollment = l1
    Name = l2
    directory = f"{Enrollment}_{Name}"
    path = os.path.join(trainimage_path, directory)
    
    if os.path.exists(path):
        t = "Student data already exists."
        text_to_speech(t)
        if message:
            message.configure(text=t)
        return
    else:
        os.makedirs(path, exist_ok=True)

    try:
        cam = cv2.VideoCapture(0)
        detector = cv2.CascadeClassifier(haarcasecade_path)
        sampleNum = 0

        while True:
            ret, img = cam.read()
            if not ret:
                continue

            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = detector.detectMultiScale(gray, 1.3, 5)

            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
                sampleNum += 1
                img_name = os.path.join(path, f"{Name}_{Enrollment}_{sampleNum}.jpg")
                cv2.imwrite(img_name, gray[y:y+h, x:x+w])
                cv2.imshow("Frame", img)

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
            elif sampleNum >= 50:
                break

        cam.release()
        cv2.destroyAllWindows()

        # Save student details
        csv_path = "StudentDetails/studentdetails.csv"
        os.makedirs(os.path.dirname(csv_path), exist_ok=True)
        with open(csv_path, "a+", newline="") as csvFile:
            writer = csv.writer(csvFile, delimiter=",")
            writer.writerow([Enrollment, Name])

        res = f"Images saved for ER No: {Enrollment} Name: {Name}"
        if message:
            message.configure(text=res)
        text_to_speech(res)

    except Exception as e:
        t = f"Error capturing images: {str(e)}"
        text_to_speech(t)
        if message:
            message.configure(text=t)
