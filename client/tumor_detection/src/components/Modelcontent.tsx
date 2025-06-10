import React from 'react';

const TumorInfo: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      {/* Imagen en la parte superior */}
      <div className="w-full flex justify-center mb-4">
        <img
          src="modelo.jpg" // Ruta de la imagen que ilustra la clasificación de tumores cerebrales
          alt="Clasificación de tumores cerebrales" // Descripción de la imagen para accesibilidad
          className="w-full max-h-64 object-cover rounded-t-lg" // Estilos con Tailwind CSS para el tamaño y forma de la imagen
        />
      </div>

      {/* Información de tumores */}
      <section>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Información de Tumores</h1>
        <hr /> {/* Línea horizontal para separar las secciones */}
        
        {/* Información sobre el Glioma */}
        <div className="mb-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Glioma</h2>
          <p className="text-gray-700 mb-3">
            Los gliomas son tumores que se originan en las células gliales del sistema nervioso central, como los astrocitos, oligodendrocitos y células ependimarias. Representan uno de los tipos más comunes de tumores cerebrales primarios.
          </p>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Características en las imágenes:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {/* Características visuales del Glioma en imágenes */}
            <li>Áreas de baja densidad: Las imágenes muestran regiones hipodensas en la sustancia blanca del cerebro.</li>
            <li>Bordes irregulares: Las masas no suelen estar bien definidas, presentando bordes difusos que dificultan su delimitación exacta.</li>
            <li>Edema peritumoral: Se observa inflamación alrededor del tumor debido a la acumulación de líquido.</li>
            <li>Deformaciones del tejido cerebral: El crecimiento del glioma puede comprimir estructuras vecinas, causando asimetrías.</li>
            <li>Localización variada: Los gliomas pueden encontrarse en diversas regiones del cerebro, dependiendo del tipo de células gliales afectadas.</li>
          </ul>
        </div>

        {/* Información sobre el Meningioma */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Meningioma</h2>
          <p className="text-gray-700 mb-3">
            Los meningiomas son tumores que se desarrollan en las meninges, las membranas que recubren y protegen el cerebro y la médula espinal. Constituyen uno de los tumores cerebrales más comunes y, en la mayoría de los casos, son benignos.
          </p>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Características en las imágenes:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {/* Características visuales del Meningioma en imágenes */}
            <li>Forma redonda u ovalada: Los meningiomas suelen tener bordes bien definidos y contornos regulares.</li>
            <li>Ubicación periférica: Aparecen en la superficie del cerebro, cerca de las meninges.</li>
            <li>Sin infiltración del tejido cerebral: Aunque pueden causar desplazamientos, rara vez invaden el tejido adyacente.</li>
            <li>Desplazamiento de estructuras cerebrales: El crecimiento del tumor puede comprimir y desplazar estructuras vecinas.</li>
          </ul>
        </div>

        {/* Información sobre el Tumor Pituitario */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Tumor Pituitario</h2>
          <p className="text-gray-700 mb-3">
            Los tumores pituitarios se desarrollan en la glándula pituitaria (hipófisis), una pequeña estructura localizada en la base del cerebro, responsable de la regulación hormonal del organismo.
          </p>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Características en las imágenes:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {/* Características visuales del Tumor Pituitario en imágenes */}
            <li>Localización en la región selar: Los tumores aparecen en la silla turca, la cavidad ósea donde se encuentra la glándula pituitaria.</li>
            <li>Lesiones bien definidas: Suelen ser fáciles de distinguir en las imágenes por sus contornos claros.</li>
            <li>Efecto de compresión: En algunos casos, el tumor puede presionar estructuras cercanas, como el quiasma óptico, causando síntomas neurológicos.</li>
            <li>Tamaño variable: Los tumores pueden ser pequeños (microadenomas) o grandes (macroadenomas), lo cual afecta su visibilidad en las imágenes.</li>
          </ul>
        </div>

        {/* Información sobre "No Tumor" */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">No Tumor</h2>
          <p className="text-gray-700 mb-3">
            Las imágenes clasificadas como "No Tumor" corresponden a cerebros que no presentan alteraciones patológicas visibles. Estas imágenes representan la anatomía cerebral normal.
          </p>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Características en las imágenes:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {/* Características visuales de una imagen "No Tumor" */}
            <li>Estructuras cerebrales normales: No se detectan anomalías en las distintas regiones del cerebro.</li>
            <li>Sin masas visibles: Las imágenes no muestran tumores ni crecimiento anormal de tejidos.</li>
            <li>Sin edema ni desplazamientos: No hay evidencia de inflamación o deformaciones que indiquen la presencia de una patología.</li>
            <li>Sin realce anormal con contraste: En estudios con contraste, no se observan áreas que indiquen captación patológica.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TumorInfo;
