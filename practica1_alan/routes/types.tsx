export type People = {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
};

export type StarShip = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;

  results: StarShip[];
};
