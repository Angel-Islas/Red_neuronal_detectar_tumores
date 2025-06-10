'use client';
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';

// Definir tipo para los nombres de navegación
type ContentName = 'Inicio' | 'Información' | 'Consulta' | 'Manual de Usuario';

// Actualizar el tipo de las props del Navbar
interface NavbarProps {
  onNavClick: (contentName: ContentName) => void;
}

const navItems: { name: ContentName; href: string }[] = [
  { name: 'Inicio', href: '/' }, // maincontent
  { name: 'Información', href: '/informacion' }, // modelcontent
  { name: 'Consulta', href: '/consulta' }, // usercontent
  { name: 'Manual de Usuario', href: '/manual' }, // datacontent
];

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img
              src="foto.jpeg"
              alt="Logo"
              width={60}
              height={60}
              className="h-16 rounded-full w-auto"
            />
          </div>
          <div className="hidden ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavClick(item.name)}
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:border-gray-300 hover:text-gray-700"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <IoMdClose className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <CiMenuBurger className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  onNavClick(item.name);
                  setIsOpen(false);
                }}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
