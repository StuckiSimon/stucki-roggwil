export type Capacity = {
  date: string;
  capacityHours: number;
  bookedHours: number;
};

export type Slot = {
  date: string;
  startHour: string;
  endHour: string;
};
