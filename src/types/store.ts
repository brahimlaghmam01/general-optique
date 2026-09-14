export interface Store {
  id: string;
  /** Full brand name, e.g. "Générale d'Optique Nice Masséna". */
  fullName: string;
  /** Short label used in compact selector rows, e.g. "Nice Masséna". */
  shortName: string;
  tag?: string;
  addressLine: string;
  distanceLabel: string;
  hoursLabel: string;
}
