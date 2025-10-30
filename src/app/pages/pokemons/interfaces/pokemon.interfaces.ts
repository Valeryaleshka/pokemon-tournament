export interface Pokemon {
  id: number;
  name: string;
  type: string;
  baseExperience: number;
  wins: number;
  losses: number;
  ties: number;
  winRate: number;
  imageUrl: string;
}
