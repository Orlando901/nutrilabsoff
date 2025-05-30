export interface Complement {
  nom: string;
  description: string;
  bienfaits: string[];
  effets_secondaires?: string[];
  mode_emploi?: string;
  sources?: string[];
  [key: string]: any;
}
