import React from 'react';

const Usercontent: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      {/* Imagen en la parte superior */}
      <div className="w-full flex justify-center mb-4">
        <img
          src="manual.jpg"
          alt="Manual de Usuario"
          className="w-full max-h-64 object-cover rounded-t-lg"
        />
      </div>

      {/* Contenido del manual de usuario */}
      <section>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Manual de Usuario</h1>
        <hr />
        {/* Introducción */}
        <div className="mb-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Introducción</h2>
          <p className="text-gray-700">
            Esta plataforma está diseñada para procesar radiografías de tumores cerebrales y proporcionar un análisis basado en cuatro tipos de tumores: glioma, meningioma, no tumor y pituitary. Además, si la radiografía no coincide con estos tipos, el sistema proporcionará un porcentaje para otros tipos de tumores cerebrales.
          </p>
        </div>

        {/* Requisitos de la Imagen */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Requisitos de la Imagen</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Formato: JPG</li>
            <li>Relación de Aspecto: Cuadrada</li>
            <li>Contenido: Una sola toma de la cabeza en la radiografía</li>
            <li>Claridad: La imagen debe ser clara y el tumor debe ocupar un buen tamaño de la imagen para obtener mejores resultados.</li>
          </ul>
          <div className="w-full flex justify-center mt-4">
            <img
              src="manual1.jpg"
              alt="Ejemplo de Imagen"
              className="w-60 h-60 object-cover"
            />
          </div>
        </div>

        {/* Instrucciones Paso a Paso */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Instrucciones Paso a Paso</h2>

          {/* Subir Imagen para Diagnóstico */}
          <div className="mb-4">
            <br/>
            <h3 className="text-lg font-medium text-gray-700 mb-2">1. Subir Imagen para Diagnóstico</h3>
            <ul className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Haga clic en el botón "Seleccionar archivo" dentro de la sección "Subir Imagen para Diagnóstico".</li>
              <li>Seleccione la imagen de la radiografía en formato JPG desde su dispositivo.</li>
              <li>Presione el botón "Subir y Diagnosticar".</li>
              <li>La aplicación procesará la imagen y proporcionará un porcentaje de similitud con los tipos de tumores mencionados.</li>
            </ul>
            <div className="w-full flex justify-center mt-4">
            <img
              src="manual2.jpg"
              alt="Ejemplo DIAGNOSTICO"
              className="w-70 h-70 object-cover"
            />
          </div>
          </div>

          {/* Generar PDF */}
          <div className="mb-4">
            <br/>
            <h3 className="text-lg font-medium text-gray-700 mb-2">2. Generar PDF</h3>
            <ul className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Complete el formulario proporcionando los siguientes datos:</li>
              <ul className="list-disc list-inside ml-6">
                <li><strong>Nombres:</strong> Introduzca su(s) nombre(s).</li>
                <li><strong>Apellidos:</strong> Introduzca su(s) apellidos.</li>
                <li><strong>Correo:</strong> Introduzca una dirección de correo válida.</li>
                <li><strong>Teléfono:</strong> Proporcione un número de teléfono de 10 dígitos.</li>
                <li><strong>Edad:</strong> Indique su edad en números enteros.</li>
              </ul>
              <li>Después de llenar todos los campos, presione el botón "Generar PDF".</li>
              <li>La aplicación generará un archivo PDF con los resultados del análisis de la imagen.</li>
            </ul>
            <div className="w-full flex justify-center mt-4">
              <img
                src="manual3.jpg"
                alt="Ejemplo de Gen_PDF"
                className="w-70 h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Notas Importantes */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Notas Importantes</h2>
          <p className="text-gray-700">
            - El PDF generado es únicamente de referencia y <strong>no debe considerarse como un diagnóstico médico</strong>.
            <br />
            - Asegúrese de seguir todas las instrucciones cuidadosamente para obtener mejores resultados.
            <br />
          </p>
        </div>
      </section>
    </div>
  );
};

export default Usercontent;
