import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormulaireSuggestion from '../components/FormulaireSuggestion';

export default function Accueil() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/image1.jpg')` }}>
        {/* Navigation */}
        <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-md">
          {/* Liens de navigation à gauche */}
          <nav className="flex space-x-8 text-gray-800 text-base font-medium">
            <a href="#accueil" className="hover:text-indigo-600">Accueil</a>
            <a href="#apropos" className="hover:text-indigo-600">À propos</a>
            <a href="#methodologie" className="hover:text-indigo-600">Notre méthode</a>
            <a href="#contribuer" className="hover:text-indigo-600">Contribuer</a>
            <a href="#contact" className="hover:text-indigo-600">Nous joindre</a>
          </nav>

          {/* Logo à droite */}
          <h1 className="text-2xl font-bold text-gray-900">NutriLabs</h1>
        </header>

        {/* Accueil principal */}
        <main id="accueil" className="flex flex-col justify-center items-center text-center text-white h-[calc(100vh-96px)] bg-black/50 px-4">
          <h2 className="text-lg tracking-widest uppercase">Bienvenue sur NutriLabs</h2>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">Explorez les compléments alimentaires</h1>
          <p className="text-lg max-w-xl mb-10">Des fiches fiables, scientifiques et claires sur des dizaines de compléments utiles pour votre santé et vos performances.</p>

          {/* Boutons */}
          <button
            onClick={() => navigate('/complements')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
          >
            En savoir plus sur les compléments
          </button>
          <button
            onClick={() => navigate('/vitamines')}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
          >
            En savoir plus sur les vitamines
          </button>
          <button
            onClick={() => navigate('/proteines')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
          >
            En savoir plus sur les protéines et acides aminés
          </button>
        </main>

        {/* À propos */}
        <section id="apropos" className="bg-gradient-to-r from-[#d7e8dc] to-[#d9eee0] py-20 px-6 md:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">À propos</h2>
          <p className="text-gray-800 text-lg leading-relaxed max-w-4xl mx-auto">
            NutriLabs est un projet né de la passion d’étudiants pour la nutrition et la santé. Nous ne sommes ni une entreprise, ni des professionnels diplômés. Ce site n’a aucun but lucratif.
            Notre objectif est simple : offrir un accès gratuit et vulgarisé à des informations fiables sur les compléments alimentaires. Chaque fiche est fondée sur des recherches scientifiques et non sur notre propre expérience. Nous croyons que l’information de qualité ne devrait pas être réservée aux experts, mais accessible à tous.
          </p>
        </section>

        {/* Notre méthode */}
        <section id="methodologie" className="bg-gradient-to-r from-[#d7e8dc] to-[#d9eee0] py-20 px-6 md:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre méthode</h2>
          <p className="text-gray-800 text-lg leading-relaxed max-w-4xl mx-auto">
            Pour chaque complément, nous réalisons une recherche documentaire rigoureuse à partir de sources académiques et scientifiques telles que PubMed, ResearchGate, ou encore Google Scholar.
            Nous analysons les publications avec un regard critique : échantillons, méthodologie, conclusions, contradictions. Nous ne donnons jamais d’avis médical, mais résumons de manière pédagogique ce que dit la science. Nous priorisons la clarté, l’honnêteté et la rigueur.
            Chaque fiche comporte également une section "comment ça marche ?" pour expliquer les mécanismes biologiques de manière accessible.
          </p>
        </section>

        {/* Contribuer */}
        <section id="contribuer" className="bg-gradient-to-r from-[#d7e8dc] to-[#d9eee0] py-20 px-6 md:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contribuer</h2>
          <p className="text-gray-800 text-lg leading-relaxed max-w-4xl mx-auto mb-10">
            Vous souhaitez participer à NutriLabs ? Proposez un complément ci-dessous 👇
          </p>
          <FormulaireSuggestion />
        </section>

        {/* Nous joindre */}
        <section id="contact" className="bg-gradient-to-r from-[#d7e8dc] to-[#d9eee0] py-20 px-6 md:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Nous joindre</h2>
          <p className="text-gray-800 text-lg leading-relaxed max-w-3xl mx-auto">
            Vous pouvez nous contacter ou rejoindre notre communauté via notre serveur Discord. Il s’agit d’une plateforme gratuite qui permet de discuter en temps réel par messages ou vocalement. <br />
            Cliquez sur le lien ci-dessous pour accéder à notre espace d’échange.
          </p>
          <a
            href="https://discord.gg/df77tNPU9M"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full text-lg shadow hover:bg-indigo-700"
          >
            Rejoindre le Discord</a>
        </section>

      </div>
    </div>
  );
}