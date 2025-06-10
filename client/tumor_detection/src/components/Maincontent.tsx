const MainContent = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      {/* Imagen en la parte superior */}
      <div className="w-full flex justify-center mb-4">
        <img
          src="inicio.jpg" // Ruta de la imagen
          alt="Referencia visual sobre tumores cerebrales" // Descripción de la imagen para accesibilidad
          className="w-full max-h-64 object-cover rounded-t-lg" // Estilos de Tailwind para el tamaño y forma de la imagen
        />
      </div>

      {/* Información del proyecto */}
      <section>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Información del Proyecto</h1>
        <hr /> {/* Línea horizontal para separar secciones */}
        <p className="text-gray-700 mb-4 mt-4">
          La aplicación es una herramienta educativa diseñada para proporcionar información general sobre las clasificaciones de tumores cerebrales. Su objetivo principal es proporcionar información general sobre la clasificación de tumores cerebrales de manera educativa y de consulta básica, sirviendo como una guía de referencia para acudir con un especialista.
        </p>
        {/* Caja destacada con una nota importante */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg border-l-4 border-yellow-500 mb-4">
          <strong>Nota importante:</strong> La información proporcionada por la aplicación es referencial, de carácter teórico y no debe considerarse como diagnóstico médico. Por lo tanto, no debe considerarse como base para diagnósticos ni tratamientos.
        </div>
      </section>

      {/* Funcionalidades principales */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Funcionalidades Principales</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {/* Lista de las funcionalidades principales de la aplicación */}
          <li>Consulta de clasificaciones de tumores cerebrales: La aplicación ofrece información teórica y referencial sobre las principales clasificaciones de tumores cerebrales.</li>
          <li>Formación básica para guía profesional: La información proporcionada tiene un carácter informativo y puede servir como una guía inicial para posteriormente acudir con un profesional de la salud.</li>
          <li>Referencias visuales: La aplicación incluye ilustraciones genéricas que ayudan a identificar o entender las clasificaciones, siempre desde un enfoque teórico.</li>
          <li>Glosario de términos básicos: Una sección dedicada a la definición de conceptos clave relacionados con los tumores cerebrales para mejorar la comprensión de los usuarios.</li>
        </ul>
      </section>

      {/* Público objetivo */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Público Objetivo</h2>
        <p className="text-gray-700">
          La aplicación está diseñada para ser utilizada por cualquier persona que necesite una referencia o guía teórica sobre las clasificaciones de tumores cerebrales, incluyendo:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {/* Lista de los grupos a los que está dirigida la aplicación */}
          <li>Personas interesadas en aprender más sobre el tema.</li>
          <li>Individuos que buscan una guía inicial para comprender términos antes de acudir a un profesional de la salud.</li>
          <li>Usuarios en busca de información educativa y referencial sobre clasificaciones básicas de tumores cerebrales.</li>
        </ul>
      </section>

      {/* Limitaciones */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Limitaciones</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {/* Lista de las limitaciones de la aplicación */}
          <li>No es un sustituto de un diagnóstico médico profesional.</li>
          <li>La información está basada en teorías generales y no en datos específicos ni avalados por especialistas.</li>
          <li>Cualquier decisión médica debe ser consultada con un profesional calificado.</li>
        </ul>
      </section>
    </div>
  );
};

export default MainContent;
