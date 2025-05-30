import { Routes, Route } from 'react-router-dom';
import ListeComplements from './pages/ListeComplements';
import FicheComplement from './pages/FicheComplement';
import Accueil from './pages/Accueil';
import Chat from './pages/Chat';
import ChatWidget from './components/ChatWidget'; // ✅ ajout ici
import Vitamines from './pages/Vitamines';
import Proteines from './pages/Proteines';


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/complements" element={<ListeComplements />} />
        <Route path="/complement/:nom" element={<FicheComplement />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/vitamines" element={<Vitamines />} />
        <Route path="/proteines" element={<Proteines />} />

      </Routes>

      {/* ✅ Bulle flottante du chatbot partout */}
      <ChatWidget />
    </>
  );
}
