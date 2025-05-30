import { useState } from 'react';

export default function Chat() {
  const [question, setQuestion] = useState('');
  const [reponse, setReponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setReponse('');

    try {
      const res = await fetch('http://localhost:3001/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setReponse(data.response);
    } catch (err) {
      setReponse("❌ Une erreur est survenue. Vérifie que le serveur tourne bien.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9f0e6] to-[#d3e5d2] text-gray-900 flex flex-col items-center px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">💬 Pose ta question sur un complément</h1>

      <form onSubmit={handleAsk} className="w-full max-w-xl flex flex-col gap-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Exemple : À quoi sert la créatine ?"
          className="px-4 py-3 rounded-md border border-gray-300 shadow text-black"
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? 'Chargement...' : 'Envoyer'}
        </button>
      </form>

      {reponse && (
        <div className="mt-8 max-w-xl bg-white/80 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Réponse :</h2>
          <p className="whitespace-pre-wrap">{reponse}</p>
        </div>
      )}
    </div>
  );
}
