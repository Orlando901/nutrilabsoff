import { useParams, useNavigate } from 'react-router-dom';
import type { Complement } from '../types/Complement';

// @ts-ignore : import dynamique de toutes les fiches
const modules = import.meta.glob('../complements/*.ts', { eager: true });

export default function FicheComplement() {
  const { nom } = useParams();
  const navigate = useNavigate();
  const cleanNom = nom?.toLowerCase();

  let complement: Complement | null = null;

  for (const path in modules) {
    const mod = modules[path] as { cafeine?: Complement; [key: string]: any };
    const fiche = Object.values(mod)[0] as Complement;
    if (fiche?.nom?.toLowerCase() === cleanNom) {
      complement = fiche;
      break;
    }
  }

  if (!complement) {
    return (
      <p className="p-10 text-center text-xl text-red-500">
        Aucun complément trouvé.
      </p>
    );
  }

  return (
    <>
      {/* Flèche de retour */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 w-10 h-10 hover:scale-110 transition-transform"
        aria-label="Retour"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          className="w-full h-full"
        >
          <path
            fillRule="evenodd"
            d="M15.78 3.22a.75.75 0 010 1.06L9.81 10.25H21a.75.75 0 010 1.5H9.81l5.97 5.97a.75.75 0 01-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Contenu principal */}
      <div className="relative max-w-4xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-lg">
        {/* Titre principal */}
        <h1 className="text-4xl font-bold text-center text-black mb-8 underline underline-offset-8">
          {complement.nom}
        </h1>

        {/* Description du complément */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {Object.entries(complement).map(([key, value], index) => {
            if (key === 'nom' || key === 'categorie') return null;
            return (
              <div key={index} className="mb-10">
                <h2 className="text-2xl text-center font-semibold text-black mt-8 mb-4">
                  {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </h2>
                <p className="text-justify text-[1.075rem] leading-relaxed whitespace-pre-wrap">
                  {value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}