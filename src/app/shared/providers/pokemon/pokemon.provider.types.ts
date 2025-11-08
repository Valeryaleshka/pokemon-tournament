import { PokemonType } from '@app/shared/types/pokemon.types';

export interface PokemonApiResponse {
  abilities:              Ability[];
  baseExperience:         number;
  cries:                  Cries;
  forms:                  PokemonSpeciesResponse[];
  gameIndices:            GameIndex[];
  height:                 number;
  heldItems:              any[];
  id:                     number;
  isDefault:              boolean;
  locationAreaEncounters: string;
  moves:                  Move[];
  name:                   string;
  order:                  number;
  pastAbilities:          PastAbility[];
  pastTypes:              any[];
  species:                PokemonSpeciesResponse;
  sprites:                Sprites;
  stats:                  Stat[];
  types:                  PokemonTypeResponse[];
  weight:                 number;
}

export interface Ability {
  ability:  PokemonSpeciesResponse | null;
  isHidden: boolean;
  slot:     number;
}

export interface PokemonSpeciesResponse {
  name: PokemonType;
  url:  string;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  gameIndex: number;
  version:   PokemonSpeciesResponse;
}

export interface Move {
  move:                PokemonSpeciesResponse;
  versionGroupDetails: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  levelLearnedAt:  number;
  moveLearnMethod: PokemonSpeciesResponse;
  order:           number | null;
  versionGroup:    PokemonSpeciesResponse;
}

export interface PastAbility {
  abilities:  Ability[];
  generation: PokemonSpeciesResponse;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl":        Sprites;
  "heartgold-soulsilver": Sprites;
  platinum:               Sprites;
}

export interface Versions {
  "generation-i":    GenerationI;
  "generation-ii":   GenerationIi;
  "generation-iii":  GenerationIii;
  "generation-iv":   GenerationIv;
  "generation-v":    GenerationV;
  "generation-vi":   { [key: string]: Home };
  "generation-vii":  GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Other {
  dreamWorld:         DreamWorld;
  home:               Home;
  "official-artwork": OfficialArtwork;
  showdown:           Sprites;
}

export interface Sprites {
  backDefault:      string;
  backFemale:       null;
  backShiny:        string;
  backShinyFemale:  null;
  frontDefault:     string;
  frontFemale:      null;
  frontShiny:       string;
  frontShinyFemale: null;
  other?:           Other;
  versions?:        Versions;
  animated?:        Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow:     RedBlue;
}

export interface RedBlue {
  backDefault:      string;
  backGray:         string;
  backTransparent:  string;
  frontDefault:     string;
  frontGray:        string;
  frontTransparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold:    Gold;
  silver:  Gold;
}

export interface Crystal {
  backDefault:           string;
  backShiny:             string;
  backShinyTransparent:  string;
  backTransparent:       string;
  frontDefault:          string;
  frontShiny:            string;
  frontShinyTransparent: string;
  frontTransparent:      string;
}

export interface Gold {
  backDefault:       string;
  backShiny:         string;
  frontDefault:      string;
  frontShiny:        string;
  frontTransparent?: string;
}

export interface GenerationIii {
  emerald:             OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire":     Gold;
}

export interface OfficialArtwork {
  frontDefault: string;
  frontShiny:   string;
}

export interface Home {
  frontDefault:     string;
  frontFemale:      null;
  frontShiny:       string;
  frontShinyFemale: null;
}

export interface GenerationVii {
  icons:                  DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  frontDefault: string;
  frontFemale:  null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat {
  baseStat: number;
  effort:   number;
  stat:     PokemonSpeciesResponse;
}

export interface PokemonTypeResponse {
  slot: number;
  type: PokemonSpeciesResponse;
}
