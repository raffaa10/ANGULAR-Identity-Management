export interface UserLdap {
  id: number;
  login: string;
  nom: string;
  prenom: string;
  nomComplet: string;
  motDePass: string;
  mail: string;
  role: string;
  employeNumero: number;
  employeNiveau: number;
  dateEmbauche: string;
  publisherId: number;
  active: boolean;
}
