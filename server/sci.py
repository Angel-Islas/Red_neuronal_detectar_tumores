import numpy as np
import pickle
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.preprocessing import LabelEncoder

# Cargar los datos
# Se cargan los datos de entrenamiento y prueba desde archivos pickle previamente preparados.
# Las "ImagenesEntrenar" y "ImagenesPrueba" contienen las imágenes de entrada, mientras que
# "EtiquetasEntrenar" y "EtiquetasPrueba" contienen las etiquetas correspondientes.
ImagenesEntrenar = pickle.load(open("C:/Users/angel/OneDrive/Escritorio/red/server/entrenamiento/ImagenesEntrenar.pickle", "rb"))
EtiquetasEntrenar = pickle.load(open("C:/Users/angel/OneDrive/Escritorio/red/server/entrenamiento/EtiquetasEntrenar.pickle", "rb"))
ImagenesPrueba = pickle.load(open("C:/Users/angel/OneDrive/Escritorio/red/server/entrenamiento/ImagenesPrueba.pickle", "rb"))
EtiquetasPrueba = pickle.load(open("C:/Users/angel/OneDrive/Escritorio/red/server/entrenamiento/EtiquetasPrueba.pickle", "rb"))

# Normalizar imágenes y aplanarlas
# Se normalizan las imágenes dividiendo los valores de píxeles entre 255 (escala 0-1).
# Además, se aplanan las imágenes para convertirlas en vectores unidimensionales.
ImagenesEntrenar = np.array(ImagenesEntrenar).reshape(len(ImagenesEntrenar), -1) / 255.0
ImagenesPrueba = np.array(ImagenesPrueba).reshape(len(ImagenesPrueba), -1) / 255.0

# Codificar etiquetas si no están en formato numérico
# Se utiliza LabelEncoder para convertir las etiquetas categóricas en valores numéricos.
le = LabelEncoder()
EtiquetasEntrenar = le.fit_transform(EtiquetasEntrenar)
EtiquetasPrueba = le.transform(EtiquetasPrueba)

# Crear el modelo MLPClassifier
# Se define un clasificador de perceptrón multicapa (MLPClassifier) con dos capas ocultas:
# - La primera capa tiene 128 neuronas
# - La segunda capa tiene 64 neuronas
# Se utiliza la función de activación ReLU, el optimizador Adam, y se configura un número máximo de iteraciones de 100.
model = MLPClassifier(hidden_layer_sizes=(128, 64), activation='relu', solver='adam', max_iter=100, random_state=42)

# Entrenar el modelo
# El modelo se entrena utilizando las imágenes y etiquetas de entrenamiento.
model.fit(ImagenesEntrenar, EtiquetasEntrenar)

# Evaluar el modelo
# Se generan predicciones para el conjunto de prueba y se calcula la precisión del modelo.
predictions = model.predict(ImagenesPrueba)
accuracy = accuracy_score(EtiquetasPrueba, predictions)
print(f"Precisión en las pruebas: {accuracy:.4f}")

# Calcular la matriz de confusión
# La matriz de confusión muestra cómo el modelo clasifica cada clase respecto a las etiquetas reales.
conf_matrix = confusion_matrix(EtiquetasPrueba, predictions)

# Visualizar la matriz de confusión
# Se utiliza Seaborn para crear un mapa de calor que visualice la matriz de confusión de manera clara.
plt.figure(figsize=(10, 8))
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', xticklabels=le.classes_, yticklabels=le.classes_)
plt.xlabel('Predicciones')
plt.ylabel('Etiquetas reales')
plt.title('Matriz de Confusión')
plt.show()
