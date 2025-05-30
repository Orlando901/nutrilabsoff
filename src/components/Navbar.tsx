import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-8 py-6 shadow-md bg-white/80 sticky top-0 z-50">
      {/* NAVIGATION À GAUCHE */}
      <nav className="flex space-x-8 text-gray-800 text-base font-medium">
        <a href="/#accueil" className="hover:text-indigo-600">Accueil</a>
        <a href="/#apropos" className="hover:text-indigo-600">À propos</a>
        <a href="/#methodologie" className="hover:text-indigo-600">Notre méthode</a>
        <a href="/#contribuer" className="hover:text-indigo-600">Contribuer</a>

        <a href="/#contact" className="hover:text-indigo-600">Nous joindre</a>
      </nav>

      {/* LOGO À DROITE */}
      <h1 className="text-2xl font-bold text-gray-900">Nutrilabs</h1>
    </header>
  );
}
