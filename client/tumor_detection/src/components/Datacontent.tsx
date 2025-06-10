import React, { useState, ChangeEvent } from "react";

// Definición de tipos para los datos de la predicción y del formulario
type Prediction = {
    result: string; // Resultado de la predicción (ej. 'Tumor Maligno' o 'Tumor Benigno')
    probabilities: Record<string, number>; // Probabilidades de las clases predichas
    imagePath: string; // Ruta de la imagen relacionada con la predicción
};

type FormData = {
    nombres: string;  // Nombre(s) del usuario
    apellidos: string; // Apellido(s) del usuario
    correo: string;    // Correo electrónico del usuario
    telefono: string;  // Número de teléfono del usuario
    edad: string;      // Edad del usuario
};

const Datacontent: React.FC = () => {
    // Estados para manejar el archivo, la predicción, la vista previa, el formulario y el estado de carga
    const [file, setFile] = useState<File | null>(null); // Archivo seleccionado
    const [loading, setLoading] = useState(false); // Estado de carga (si está procesando la imagen)
    const [prediction, setPrediction] = useState<Prediction | null>(null); // Datos de la predicción
    const [preview, setPreview] = useState<string | null>(null); // Vista previa de la imagen seleccionada
    const [formData, setFormData] = useState<FormData>({ // Datos del formulario de usuario
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        edad: "",
    });

    // Maneja el cambio de archivo (imagen) seleccionado
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null; // Obtiene el primer archivo seleccionado (si existe)
        setFile(file); // Actualiza el estado con el archivo seleccionado

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // Establece la vista previa de la imagen seleccionada
            };
            reader.readAsDataURL(file); // Lee el archivo como URL de datos
        }
    };

    // Maneja la carga del archivo y realiza la predicción
    const handleUpload = async () => {
        if (!file) {
            alert("Por favor, selecciona una imagen."); // Muestra alerta si no hay imagen seleccionada
            return;
        }

        const uploadData = new FormData();
        uploadData.append("file", file); // Crea un formulario con el archivo seleccionado

        setLoading(true); // Activa el estado de carga

        try {
            // Realiza la solicitud POST al servidor para hacer la predicción
            const response = await fetch("http://localhost:3000/predict", {
                method: "POST",
                body: uploadData,
            });

            const data = await response.json(); // Obtiene los datos de la respuesta en formato JSON

            if (data.error) {
                alert(`Error: ${data.error}`); // Si hay un error, muestra un mensaje de alerta
            } else {
                setPrediction(data); // Si la predicción es exitosa, establece el estado con los datos de predicción
            }
        } catch (error) {
            alert(`Error al procesar la solicitud: ${(error as Error).message}`); // Muestra alerta si hay un error en la solicitud
        } finally {
            setLoading(false); // Desactiva el estado de carga después de la solicitud
        }
    };

    // Maneja la validación del correo cuando el campo pierde el foco
    const handleEmailValidation = (e: ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
        const { value } = e.target;

        if (!emailRegex.test(value)) {
            alert("El correo electrónico no es válido.");
        }

        // Actualiza el estado del formulario para todos los campos
        //setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Maneja los cambios en los campos del formulario
    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Validar solo dígitos para el campo "telefono"
        if (name === "telefono" && !/^\d*$/.test(value)) return;

        // Validar que la edad sea un número entre 0 y 120
        if (name === "edad" && (!/^\d*$/.test(value) || parseInt(value) < 0 || parseInt(value) > 120)) {
            alert("Por favor, ingrese una edad válida entre 0 y 120.");
            return;
        }

        // Actualiza el estado del formulario para todos los campos
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    

    // Genera el PDF con los datos del formulario y la predicción
    const handleGeneratePDF = async () => {
        if (!prediction) {
            alert("Primero realiza una predicción."); // Muestra alerta si no hay predicción
            return;
        }

        const data = { ...formData, result: prediction.result, probabilities: prediction.probabilities, image_path: prediction.imagePath };

        try {
            // Realiza la solicitud POST al servidor para generar el PDF
            const response = await fetch("http://localhost:3000/generate_pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const blob = await response.blob(); // Convierte la respuesta en un Blob (archivo)
                const url = window.URL.createObjectURL(blob); // Crea una URL para el archivo Blob
                window.open(url, "_blank"); // Abre el PDF en una nueva ventana
            } else {
                alert("Error al generar el PDF."); // Muestra alerta si no se pudo generar el PDF
            }
        } catch (error) {
            alert(`Error: ${(error as Error).message}`); // Muestra alerta si ocurre un error en la solicitud
        }
    };

    return (
        <div className="font-sans m-5 bg-white">

            {/* Contenedor para cargar la imagen y mostrar el diagnóstico */}
            <div className="flex flex-col sm:flex-row justify-center items-center p-5 space-y-5 sm:space-y-0 sm:space-x-5">
                {/* Panel para subir imagen */}
                <div className="sm:w-1/2 border border-blue-500 p-5 rounded-lg">
                    <h2 className="text-center mb-4"><strong>Subir Imagen para Diagnóstico</strong></h2>
                    <input type="file" onChange={handleFileChange} accept="image/*" className="block mx-auto mb-4" />
                    <div className="flex justify-center">
                        <button onClick={handleUpload} disabled={loading} className="bg-blue-500 text-white px-4 py-2 mx-auto rounded hover:bg-blue-600">
                            {loading ? "Procesando..." : "Subir y Diagnosticar"}
                        </button>
                    </div>
                    {preview && (
                        <div className="mt-5 text-center">
                            <h2>Imagen Seleccionada</h2>
                            <img src={preview} alt="Imagen Seleccionada" className="max-w-full h-auto mx-auto" />
                        </div>
                    )}
                </div>

                {/* Panel para mostrar el resultado de la predicción */}
                {prediction && (
                    <div className="sm:w-1/2 border border-blue-500 p-5 rounded-lg">
                        <h2 className="text-center mb-4"><strong>Resultado de la Predicción</strong></h2>
                        <p><strong>Tumor Predicho:</strong> {prediction.result}</p>
                        <h3 className="mt-4">Probabilidades:</h3>
                        <ul className="list-disc pl-5">
                            {Object.entries(prediction.probabilities).map(([key, value]) => (
                                <li key={key}><strong>{key}:</strong> {value}%</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Formulario para ingresar los datos del usuario y generar el PDF */}
            <div className="border border-blue-500 p-5 rounded-lg text-center">
                {/* Título del formulario */}
                <h2 className="mb-4"><strong>Generar PDF</strong></h2>
                
                {/* Renderiza dinámicamente los campos del formulario */}
                {Object.keys(formData).map((key) => (
                    <input
                        key={key} // Clave única basada en el nombre del campo
                        type={key === "telefono" ? "tel" : key === "edad" ? "number" : key === "correo" ? "email" : "text"}
                        name={key} // Nombre del campo (para identificarlo en el estado)
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Coloca un placeholder con la primera letra en mayúscula
                        value={(formData as any)[key]} // Valor actual del campo tomado del estado
                        onChange={handleFormChange} // Maneja los cambios para actualizar el estado
                        onBlur={key === "correo" ? handleEmailValidation : undefined} // Solo valida el correo al salir del campo
                        maxLength={key === "telefono" ? 10 : undefined} // Limita la longitud del campo de teléfono a 10 caracteres 
                        className="block w-full border rounded px-3 py-2 mb-4" // Clases para el estilo del campo
                        
                    />
                ))}

                {/* Botón para generar el PDF */}
                <button
                    onClick={handleGeneratePDF} // Llama a la función para generar el PDF
                    className={`px-4 py-2 rounded text-white ${
                        // Cambia las clases del botón dependiendo de si los campos están completos o no
                        Object.values(formData).every((value) => value.trim() !== "")
                            ? "bg-blue-500 hover:bg-blue-600" // Azul cuando está habilitado
                            : "bg-gray-400 cursor-not-allowed" // Gris y deshabilitado cuando no lo está
                    }`}
                    disabled={
                        !Object.values(formData).every((value) => value.trim() !== "") // Desactiva el botón si algún campo está vacío
                    }
                >
                    Generar PDF {/* Texto del botón */}
                </button>
            </div>


        </div>
    );
};

export default Datacontent;
