import { useRef } from 'react';
import './FormulaireSuggestion.css'; // pour charger les polices ou styles custom

export default function FormulaireSuggestion() {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nom = (formRef.current.nom?.value || 'Anonyme').trim();
    const message = (formRef.current.message?.value || '').trim();

    if (!message) {
      alert("Merci d'écrire une suggestion avant d'envoyer.");
      return;
    }

    try {
      const res = await fetch('/api/contribuer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          message,
        }),
      });

      if (res.ok) {
        alert('Suggestion envoyée avec succès !');
        formRef.current.reset();
      } else {
        alert("Erreur lors de l'envoi 😕");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de l'envoi 😕");
    }
  };

  return (
    <div className="flex justify-center">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-[url('/parchemin.png')] bg-cover bg-center border border-yellow-800 shadow-lg rounded-xl p-8 max-w-xl w-full font-oldstyle text-black"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Suggérer un complément</h2>

        <label htmlFor="nom" className="block mb-2">Votre nom (facultatif)</label>
        <input
          name="nom"
          type="text"
          placeholder="Votre nom (facultatif)"
          className="w-full px-4 py-2 border border-gray-400 rounded mb-6 bg-transparent text-black placeholder:text-gray-600 font-oldstyle"
        />

        <label htmlFor="message" className="block mb-2">Suggestion</label>
        <textarea
          name="message"
          placeholder="Quel complément ou étude voudriez-vous voir ajouté ?"
          required
          className="w-full px-4 py-2 border border-gray-400 rounded bg-transparent text-black min-h-[100px] placeholder:text-gray-600 font-oldstyle"
        />

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white font-bold mt-6 py-2 px-6 rounded shadow-md"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
