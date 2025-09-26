import csv
import os
import cv2
import numpy as np
from PIL import Image

def TrainImage(haarcasecade_path, trainimage_path, trainimagelabel_path, message, text_to_speech):
    # Ensure OpenCV contrib module is available
    if not hasattr(cv2.face, "LBPHFaceRecognizer_create"):
        t = "Error: OpenCV contrib module required. Install opencv-contrib-python."
        text_to_speech(t)
        if message:
            message.configure(text=t)
        return

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    detector = cv2.CascadeClassifier(haarcasecade_path)

    faces, Ids = getImagesAndLabels(trainimage_path)
    if len(faces) == 0:
        t = "No images found to train."
        text_to_speech(t)
        if message:
            message.configure(text=t)
        return

    recognizer.train(faces, np.array(Ids))
    
    # Ensure directory exists for saving
    os.makedirs(os.path.dirname(trainimagelabel_path), exist_ok=True)
    recognizer.save(trainimagelabel_path)

    res = "Images trained successfully"
    if message:
        message.configure(text=res)
    text_to_speech(res)


def getImagesAndLabels(path):
    """
    Reads images from training directories and extracts face arrays and corresponding IDs.
    Assumes folder structure: trainimage_path/Enrollment_Name/*.jpg
    """
    if not os.path.exists(path):
        return [], []

    dirs = [os.path.join(path, d) for d in os.listdir(path) if os.path.isdir(os.path.join(path, d))]
    faces = []
    Ids = []

    for directory in dirs:
        for file in os.listdir(directory):
            file_path = os.path.join(directory, file)
            try:
                pilImage = Image.open(file_path).convert("L")
                imageNp = np.array(pilImage, "uint8")
                # Extract ID from filename: Name_Enrollment_num.jpg
                Id = int(os.path.split(file_path)[-1].split("_")[1])
                faces.append(imageNp)
                Ids.append(Id)
            except Exception as e:
                print(f"Skipping file {file_path}: {e}")

    return faces, Ids
