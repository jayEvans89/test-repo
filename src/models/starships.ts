
export interface StarshipsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Starship>;
}

export interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  films: Array<string>;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: Array<string>;
  starship_class: string;
  url: string;
}
