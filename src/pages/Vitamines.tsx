import { useState, useEffect } from 'react';
import type { Complement } from '../types/Complement';
import Navbar from '../components/Navbar';

const modules = import.meta.glob('../complements/*.ts', { eager: true });

interface ComplementWithKey extends Complement {
  _id: string;
}

export default function Vitamines() {
  const [vitamines, setVitamines] = useState<ComplementWithKey[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onlyVitamines: ComplementWithKey[] = [];

    for (const path in modules) {
      const mod = modules[path] as { default: Complement };
      if (mod?.default && mod.default.nom.toLowerCase().includes('vitamine')) {
        onlyVitamines.push({ ...mod.default, _id: path });
      }
    }

    // Tri alphabétique
    onlyVitamines.sort((a, b) =>
      a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
    );

    setVitamines(onlyVitamines);
  }, []);

  const filtered = vitamines.filter((v) =>
    v.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex flex-col items-center pt-32 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/orange.jpg')` }}
      >
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher une vitamine..."
          className="w-full max-w-2xl mx-auto px-6 py-3 rounded-lg shadow-md mb-12 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Cartes des vitamines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          {filtered.map((v) => (
            <a
              href={`/complement/${encodeURIComponent(v.nom)}`}
              key={v._id}
              className="flex items-center justify-center h-24 bg-white rounded-xl shadow-md hover:shadow-xl transition hover:ring-2 hover:ring-orange-400 text-center font-semibold text-lg text-black"
            >
              {v.nom}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
