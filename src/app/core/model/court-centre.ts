export interface CourtCentre {
  id: string;
  name: string;
  courtrooms: CourtRoom[];
}

export interface CourtRoom {
  id: string;
  name: string;
}
