import { useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:3001/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse("❌ Erreur : serveur indisponible.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg text-2xl z-50"
      >
        🤖
      </button>

      {/* Fenêtre de chat */}
      {open && (
        <div className="fixed bottom-24 right-6 w-[350px] h-[450px] bg-white p-5 rounded-2xl shadow-2xl z-50 border border-gray-200 transition-all">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Assistant NutriLabs</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Pose ta question..."
              className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
            >
              {loading ? 'Chargement...' : 'Envoyer'}
            </button>
          </form>
          {response && (
            <div className="mt-3 text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 rounded-lg p-2 border border-gray-200">
              {response}
            </div>
          )}
        </div>
      )}
    </>
  );
}
