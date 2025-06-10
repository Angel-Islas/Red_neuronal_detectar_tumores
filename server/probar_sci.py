import numpy as np
import pickle
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.preprocessing import LabelEncoder
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk, ImageOps

# Cargar el modelo
model = pickle.load(open("modelado.pkl", "rb"))
le = LabelEncoder()
EtiquetasEntrenar = pickle.load(open("entrenamiento/EtiquetasEntrenar.pickle", "rb"))
le.fit(EtiquetasEntrenar)

# Función para cargar y procesar la imagen
def cargar_imagen():
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.png;*.jpg;*.jpeg")])
    if file_path:
        img = Image.open(file_path).convert('L')  # Convertir a escala de grises
        img = ImageOps.fit(img, (200, 200))  # Redimensionar a 200x200
        img_array = np.array(img).reshape(1, -1) / 255.0  # Aplanar y normalizar
        prediccion = model.predict(img_array)
        etiqueta_predicha.set(f"Predicción: {le.inverse_transform(prediccion)[0]}")

        # Mostrar imagen en la interfaz
        img_tk = ImageTk.PhotoImage(img)
        panel_imagen.config(image=img_tk)
        panel_imagen.image = img_tk

# Crear ventana principal
ventana = tk.Tk()
ventana.title("Prueba de Modelo de Clasificación")
ventana.geometry("400x400")

# Etiqueta para la predicción
etiqueta_predicha = tk.StringVar()
label_resultado = tk.Label(ventana, textvariable=etiqueta_predicha, font=("Arial", 14))
label_resultado.pack(pady=10)

# Botón para cargar imagen
btn_cargar = tk.Button(ventana, text="Cargar Imagen", command=cargar_imagen, font=("Arial", 12))
btn_cargar.pack(pady=20)

# Panel para mostrar la imagen
panel_imagen = tk.Label(ventana)
panel_imagen.pack()

# Ejecutar la aplicación
ventana.mainloop()
