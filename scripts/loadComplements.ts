import fs from 'fs';
import path from 'path';

const dir = path.join(__dirname, '../src/complements');
const fichiers = fs.readdirSync(dir).filter((f) => f.endsWith('.ts'));

const complements: { nom: string; description: string }[] = [];

for (const fichier of fichiers) {
  const contenu = fs.readFileSync(path.join(dir, fichier), 'utf-8');

  const nom = contenu.match(/nom:\s*"([^"]+)"/)?.[1];
  const description = contenu.match(/description:\s*"([^"]+)"/)?.[1];

  if (nom && description) {
    complements.push({ nom, description });
  }
}

fs.writeFileSync(
  path.join(__dirname, '../complements.json'),
  JSON.stringify(complements, null, 2),
  'utf-8'
);

console.log('✅ Fichier complements.json généré avec succès.');
