export interface HouseholdMember {
  id: string;
  name: string;
  isSelf?: boolean;
}

export interface ReferringOptician {
  name: string;
  storeLabel: string;
  phone: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberSince: number;
  avatarUrl?: string;
  memberId: string;
  dossierNumber: string;
  birthInfo: string;
  referringOptician: ReferringOptician;
  household: HouseholdMember[];
}
