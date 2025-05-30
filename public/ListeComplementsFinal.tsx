import { useState, useEffect } from 'react';
import type { Complement } from '../types/Complement';
import Navbar from '../components/Navbar';
import { filtres } from '../data/filtreComplements';
import { labelsFiltres } from '../data/filtreLabels';

const modules = import.meta.glob('../complements/*.ts', { eager: true });

interface ComplementWithKey extends Complement {
  _id: string;
}

export default function ListeComplements() {
  const [complements, setComplements] = useState<ComplementWithKey[]>([]);
  const [search, setSearch] = useState('');
  const [filtreActif, setFiltreActif] = useState<string | null>(null);

  useEffect(() => {
    const allComplements: ComplementWithKey[] = [];

    const vitamines = [
      'vitamine a', 'vitamine b1', 'vitamine b2', 'vitamine b3',
      'vitamine b5', 'vitamine b6', 'vitamine b8', 'vitamine b9', 'vitamine b12',
      'vitamine c', 'vitamine d', 'vitamine e', 'vitamine k'
    ];

    for (const path in modules) {
      const mod = modules[path] as { default: Complement };
      const fiche = mod?.default;
      const nom = fiche?.nom?.toLowerCase();

      if (fiche && !nom.includes('protéine') && !vitamines.includes(nom)) {
        allComplements.push({ ...fiche, _id: path });
      }
    }

    allComplements.sort((a, b) =>
      a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
    );

    setComplements(allComplements);
  }, []);

  const filtered = complements.filter((c) => {
    const nomMin = c.nom.toLowerCase();
    const matchSearch = nomMin.includes(search.toLowerCase());
    const matchFiltre =
      !filtreActif || filtres[filtreActif]?.includes(nomMin);
    return matchSearch && matchFiltre;
  });

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex flex-col items-center pt-32 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/vert.jpg')` }}
      >
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un complément..."
          className="w-full max-w-2xl mx-auto px-6 py-3 rounded-lg shadow-md mb-6 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {Object.keys(filtres).map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltreActif(cat === filtreActif ? null : cat)}
              className={\`px-4 py-2 rounded-full border text-sm transition \${filtreActif === cat
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}\`}
            >
              {labelsFiltres[cat] ?? cat}
            </button>
          ))}
        </div>

        {/* Cartes de compléments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          {filtered.map((c) => (
            <a
              href={\`/complement/\${encodeURIComponent(c.nom)}\`}
              key={c._id}
              className="flex items-center justify-center h-24 bg-white rounded-xl shadow-md hover:shadow-xl transition hover:ring-2 hover:ring-indigo-400 text-center font-semibold text-lg text-black"
            >
              {c.nom}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}