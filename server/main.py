# Importar las bibliotecas necesarias
from flask import Flask, request, jsonify, send_file  # Framework web para manejar solicitudes y respuestas
from flask_cors import CORS  # Para permitir solicitudes entre dominios (CORS)
import numpy as np  # Biblioteca para cálculos numéricos
import pickle  # Para cargar modelos entrenados guardados en archivos
from PIL import Image, ImageOps  # Para procesar imágenes (lectura, transformación y redimensionamiento)
from sklearn.preprocessing import LabelEncoder  # Codificador para transformar etiquetas
from fpdf import FPDF  # Generar archivos PDF
import os  # Para manejo de archivos y rutas
from datetime import datetime  # Para obtener la fecha y hora actuales

# Cargar el modelo previamente entrenado y las etiquetas de las clases
model = pickle.load(open("modelado.pkl", "rb"))  # Cargar el modelo guardado
with open("entrenamiento/EtiquetasEntrenar.pickle", "rb") as f:
    etiquetas = pickle.load(f)  # Leer las etiquetas utilizadas durante el entrenamiento

# Configurar un codificador para transformar etiquetas entre texto e índices numéricos
le = LabelEncoder()
le.fit(etiquetas)  # Entrenar el codificador con las etiquetas cargadas

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app)  # Habilitar Cross-Origin Resource Sharing para permitir solicitudes de diferentes dominios

# Diccionario que mapea índices de predicción a nombres de tumores
tumor_names = {
    0: "Glioma",  # Tumor en las células gliales del cerebro
    1: "Meningioma",  # Tumor en las meninges que rodean el cerebro
    2: "Sin tumor",  # Categoría que indica ausencia de anomalías
    3: "Pituitario",  # Tumor en la glándula pituitaria
    4: "Otros"  # Categoría de baja confianza para casos no definidos
}

# Umbral de confianza mínima para considerar una predicción como válida
CONFIDENCE_THRESHOLD = 70.0

# Ruta para realizar predicciones basadas en imágenes cargadas
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Verificar que se haya cargado un archivo en la solicitud
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400  # Error si no se encuentra el archivo

        # Procesar la imagen cargada
        file = request.files['file']
        img = Image.open(file).convert('L')  # Convertir la imagen a escala de grises
        img = ImageOps.fit(img, (200, 200))  # Redimensionar la imagen a 200x200 píxeles
        img_array = np.array(img).reshape(1, -1) / 255.0  # Normalizar los valores de los píxeles a [0, 1]

        # Realizar predicciones con el modelo cargado
        prediction_probabilities = model.predict_proba(img_array).flatten()  # Obtener probabilidades para cada clase

        # Determinar la clase con mayor probabilidad y calcular el nivel de confianza
        max_index = np.argmax(prediction_probabilities)  # Índice de la clase más probable
        max_confidence = prediction_probabilities[max_index] * 100  # Convertir la probabilidad a porcentaje

        # Asignar resultados según el nivel de confianza
        if max_confidence >= CONFIDENCE_THRESHOLD:
            predicted_tumor = tumor_names.get(max_index, "Desconocido")  # Obtener el nombre del tumor
            probabilities = {
                tumor_names.get(i, f"Clase {i}"): round(prob * 100, 2)
                for i, prob in enumerate(prediction_probabilities)
            }  # Crear un diccionario con las probabilidades por clase
        else:
            predicted_tumor = tumor_names[4]  # Clasificar como "Otros" si no cumple el umbral
            probabilities = {tumor_names[4]: 100.0}  # Asignar 100% de probabilidad a "Otros"

        # Guardar la imagen cargada temporalmente
        img_path = "uploaded_image.png"
        img.save(img_path)

        # Devolver el resultado y las probabilidades como respuesta JSON
        return jsonify({'result': predicted_tumor, 'probabilities': probabilities})

    except Exception as e:
        # Manejar errores y devolver un mensaje adecuado
        return jsonify({'error': f"Error procesando la solicitud: {str(e)}"}), 500

# Ruta para generar un archivo PDF con los resultados de la predicción
@app.route('/generate_pdf', methods=['POST'])
def generate_pdf():
    try:
        # Obtener los datos enviados desde el frontend (formulario o solicitud JSON)
        data = request.json
        result = data.get("result", "No result")  # Resultado de la predicción
        probabilities = data.get("probabilities", {})  # Probabilidades de cada clase
        nombres = data.get("nombres", "")  # Nombre del paciente
        apellidos = data.get("apellidos", "")  # Apellido del paciente
        correo = data.get("correo", "")  # Correo electrónico
        telefono = data.get("telefono", "")  # Teléfono de contacto
        edad = data.get("edad", "")  # Edad del paciente

        # Obtener la fecha y hora actuales
        fechaHoraActual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Crear texto explicativo basado en el resultado predicho
        prediction_text = {
            "Glioma": (
                "Gliomas: Tumores originados en las células gliales del sistema nervioso central. "
                "Pueden ser malignos y afectar funciones importantes del cerebro dependiendo de su localización. "
                "El tratamiento puede incluir cirugía, radioterapia o quimioterapia."
            ),
            "Meningioma": (
                "Meningiomas: Tumores generalmente benignos que se desarrollan en las meninges, "
                "las capas protectoras del cerebro y la médula espinal. Aunque suelen ser de crecimiento lento, "
                "pueden causar síntomas si comprimen tejidos cercanos."
            ),
            "Pituitario": (
                "Tumores pituitarios: Se desarrollan en la glándula pituitaria y pueden alterar el equilibrio hormonal del cuerpo. "
                "Pueden ser funcionales (secretar hormonas en exceso) o no funcionales. Los tratamientos incluyen medicación, cirugía o radioterapia."
            ),
            "Sin tumor": (
                "No Tumor: El cerebro no presenta alteraciones visibles. Se recomienda mantener chequeos regulares "
                "y un estilo de vida saludable para prevenir futuros problemas."
            ),
            "Otros": (
                "Otros: La confianza del modelo no es suficiente para clasificar esta imagen en una categoría específica. "
                "Se recomienda consultar con un especialista para un análisis más detallado."
            )
        }.get(result, "Resultado desconocido.")

        # Crear un archivo PDF
        pdf = FPDF(format="A4")
        pdf.set_auto_page_break(auto=False)  # Deshabilitar saltos automáticos de página
        pdf.add_page()  # Añadir una página

        # Añadir fondo y logo si los archivos existen
        imag = "./fondo.jpg"
        if os.path.exists(imag):
            pdf.image(imag, x=0, y=0, w=210, h=297)  # Ajustar fondo a tamaño completo

        logo_path = "./logo.png"
        if os.path.exists(logo_path):
            pdf.image(logo_path, x=85, y=20, w=40, h=40)  # Añadir un logo centrado en la parte superior

        # Agregar detalles del paciente y resultado de la predicción
        pdf.set_font("Arial", size=12)
        pdf.set_y(80)  # Ajustar el margen inicial para que el texto comience más abajo
        pdf.cell(0, 8, txt=f"Prediction: {result}", ln=True, align='L')
        pdf.cell(0, 8, txt=f"Nombres: {nombres}", ln=True, align='L')
        pdf.cell(0, 8, txt=f"Apellidos: {apellidos}", ln=True, align='L')
        pdf.cell(0, 8, txt=f"Correo: {correo}", ln=True, align='L')
        pdf.cell(0, 8, txt=f"Telefono: {telefono}", ln=True, align='L')
        pdf.cell(0, 8, txt=f"Edad: {edad}", ln=True, align='L')
        pdf.cell(0, 8, txt=f"Fecha y Hora: {fechaHoraActual}", ln=True, align='L')
        pdf.ln(10)  # Añadir un salto de línea
        pdf.multi_cell(0, 8, txt=prediction_text, align='L')  # Añadir descripción del resultado

        # Añadir probabilidades de predicción al PDF
        pdf.cell(0, 8, txt="Probabilidades:", ln=True, align='L')
        for tumor, prob in probabilities.items():
            pdf.cell(0, 8, txt=f"{tumor}: {prob}%", ln=True, align='L')

        # Agregar la imagen con tamaño ajustado
        img_path = "uploaded_image.png"
        if img_path and os.path.exists(img_path):
            pdf.ln(10)
            pdf.set_y(200)  # Posicionar la imagen más abajo
            pdf.image(img_path, x=75, y=200, w=60, h=60)

        # Advertencia al final de la página
        pdf.set_y(-30)
        pdf.set_font("Arial", size=10, style="I")
        pdf.multi_cell(0, 8, txt=(
            "ADVERTENCIA: La información proporcionada en este documento es únicamente de referencia "
            "y no debe considerarse como un diagnóstico médico. Consulte a un profesional de la salud para una evaluación adecuada."
        ), align='C')

        # Guardar y enviar el archivo PDF
        pdf_path = "result.pdf"
        pdf.output(pdf_path)

        return send_file(pdf_path, mimetype="application/pdf")

    except Exception as e:
        # Manejar errores al generar el PDF
        return jsonify({'error': f"Error generando el PDF: {str(e)}"}), 500

    finally:
        # Eliminar la imagen temporal si existe
        if os.path.exists("uploaded_image.png"):
            os.remove("uploaded_image.png")

# Ejecutar la aplicación Flask en el puerto 3000
if __name__ == "__main__":
    app.run(port=3000, debug=True)
