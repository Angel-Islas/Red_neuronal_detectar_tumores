// Importación de hooks y componentes necesarios
import { useState } from 'react'; // Importa useState de React para manejar el estado del componente
import Navbar from './components/Navbar'; // Componente para la barra de navegación
import Sidebar from './components/Sidebar'; // Componente para la barra lateral
import MainContent from './components/Maincontent'; // Componente para mostrar contenido principal
import Modelcontent from './components/Modelcontent'; // Componente para el contenido relacionado con "Modelo"
import Usercontent from './components/Usercontent'; // Componente para mostrar el manual de usuario
import Datacontent from './components/Datacontent'; // Componente para mostrar datos de análisis
import './App.css'; // Archivo de estilos CSS

// Definición de un tipo literal para los posibles contenidos a mostrar
type ContentType = 'Inicio' | 'Información' | 'Consulta' | 'Manual de Usuario';

// Componente principal de la aplicación
function App() {
  // Estado que mantiene el contenido actualmente activo
  const [activeContent, setActiveContent] = useState<ContentType>('Inicio'); // Inicializa el estado con 'Inicio'

  // Función que se ejecuta al hacer clic en un ítem de la barra de navegación
  const handleNavClick = (content: ContentType) => {
    setActiveContent(content); // Cambia el estado a la opción seleccionada
  };

  return (
    <div className="h-screen bg-gray-200">
      {/* Componente Navbar que recibe un callback para cambiar el contenido */}
      <Navbar onNavClick={handleNavClick} />

      {/* Contenedor principal que incluye Sidebar y el área de contenido */}
      <div className="flex bg-gray-200 h-screen-fit px-60 justify-center">
        {/* Sidebar con estilos de diseño */}
        <div className="bg-white h-3/5 w-fit flex-none mt-16 mr-8 rounded-lg border-2 border-gray-300">
          <Sidebar />
        </div>

        {/* Área para mostrar el contenido dinámico basado en el estado activeContent */}
        <div className="bg-white mt-16 mb-16 basis-1/2">
          {/* Condicionales para mostrar el componente correspondiente al contenido seleccionado */}
          {activeContent === 'Inicio' && <MainContent />} {/* Muestra MainContent si activeContent es 'Inicio' */}
          {activeContent === 'Información' && <Modelcontent />} {/* Muestra Modelcontent si activeContent es 'Modelo' */}
          {activeContent === 'Consulta' && <Datacontent />} {/* Muestra Datacontent si activeContent es 'Análisis' */}
          {activeContent === 'Manual de Usuario' && <Usercontent />} {/* Muestra Usercontent si activeContent es 'Manual de Usuario' */}
        </div>
      </div>
    </div>
  );
}

// Exportación del componente App como el componente principal
export default App;
