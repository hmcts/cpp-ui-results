export interface FilterOption {
  value: number | string;
  label: string;
  selected?: boolean;
}

export interface DefaultOptions {
  dateFilter?: string | number;
  courtHouseFilter?: {
    id: string | number;
    name: string;
  };
}
