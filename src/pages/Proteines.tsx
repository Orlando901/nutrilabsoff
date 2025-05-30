import { useEffect, useState } from 'react';
import type { Complement } from '../types/complement';
import Navbar from '../components/Navbar';
import { filtresProteines } from '../data/filtreProteines';

const modules = import.meta.glob('../complements/*.ts', { eager: true });

interface ComplementWithKey extends Complement {
  _id: string;
}

export default function Proteines() {
  const [proteines, setProteines] = useState<ComplementWithKey[]>([]);
  const [search, setSearch] = useState('');
  const [filtreActif, setFiltreActif] = useState<string | null>(null);

  useEffect(() => {
    const allProteines: ComplementWithKey[] = [];

    for (const path in modules) {
      const mod = modules[path] as { default: Complement };
      const fiche = mod?.default;

      if (fiche && fiche.categorie?.toLowerCase().includes('protéine')) {
        allProteines.push({ ...fiche, _id: path });
      }
    }

    setProteines(allProteines);
  }, []);

  const filtered = proteines.filter((p) => {
    const nomMin = p.nom.toLowerCase();
    const matchSearch = nomMin.includes(search.toLowerCase());
    const matchFiltre = !filtreActif || filtresProteines[filtreActif]?.some(el => nomMin.includes(el));
    return matchSearch && matchFiltre;
  });

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex flex-col items-center pt-32 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bleu.jpg')` }}
      >
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher une protéine ou un acide aminé..."
          className="w-full max-w-2xl mx-auto px-6 py-3 rounded-lg shadow-md mb-6 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {Object.keys(filtresProteines).map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltreActif(cat === filtreActif ? null : cat)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                filtreActif === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Bulles des protéines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          {filtered.map((v) => (
            <a
              href={`/complement/${encodeURIComponent(v.nom)}`}
              key={v._id}
              className="flex items-center justify-center h-24 bg-white rounded-xl shadow-md hover:shadow-xl transition hover:ring-2 hover:ring-blue-400 text-center font-semibold text-lg text-black"
            >
              {v.nom}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
