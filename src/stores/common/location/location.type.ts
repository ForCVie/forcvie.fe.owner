export type ProvincesDTO = {
  id: number;
  name: string;
  wards: WardsDTO[];
};

export type WardsDTO = {
  id: number;
  name: string;
};

export type ProvincesOldDTO = {
  id: number;
  name: string;
  districts: DistrictsOldDTO[];
};

export type DistrictsOldDTO = {
  id: number;
  name: string;
  wards: WardsOldDTO[];
};

export type WardsOldDTO = {
  id: number;
  name: string;
};
