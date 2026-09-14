import type { Appointment } from '@/types/appointment';
import type { VisitMotif, TimeSlot } from '@/types/booking';
import type { HealthAlert } from '@/types/health';
import type { LensStockAlert, VisionCheckupReminder } from '@/types/healthReminder';
import type { LensRenewal } from '@/types/lensRenewal';
import type { MutuelleInfo } from '@/types/mutuelle';
import type { Order } from '@/types/order';
import type { PastOrder } from '@/types/orderHistory';
import type { Prescription } from '@/types/prescription';
import type { SecuritySettings } from '@/types/security';
import type { Store } from '@/types/store';
import type { TiersPayantInfo } from '@/types/tiersPayant';
import type { User } from '@/types/user';
import type { VisionHistoryPoint } from '@/types/visionHistory';

export const mockUser: User = {
  id: 'usr_stevan_doe',
  firstName: 'Stevan',
  lastName: 'Doe',
  email: 'stevan.doe@email.fr',
  phone: '+33 6 12 34 42 19',
  memberSince: 2021,
  memberId: 'FOC-849-NCE',
  dossierNumber: '8841-N',
  birthInfo: 'Né le 14/05/1984 à Nice (06)',
  referringOptician: {
    name: 'Dr C. Veyrat',
    storeLabel: "Générale d'Optique · Nice Masséna",
    phone: '+33489221039',
  },
  household: [
    { id: 'hh_self', name: 'Stevan (Vous)', isSelf: true },
    { id: 'hh_lea', name: 'Léa' },
    { id: 'hh_john', name: 'John' },
  ],
};

export const mockNextAppointment: Appointment = {
  id: 'apt_20486',
  date: '2025-08-28T10:30:00',
  motif: 'Contrôle lentilles',
  practitioner: 'Dr C. Veyrat',
  store: "Générale d'Optique Nice Masséna",
  status: 'confirmed',
};

export const mockActiveOrder: Order = {
  id: 'ord_20486',
  reference: '20486',
  statusLabel: 'Montage en atelier',
  category: 'Monture & verres',
  productName: 'Ray-Ban RX5228',
  productDescription: 'Verres progressifs Essilor Ormix EPS · Anti-reflet Chrono',
  tag: 'Équipement principal',
  specs: ['Indice 1.6', 'Filtre Bleu EPS'],
  pickupLocation: "Générale d'Optique Nice Masséna · Atelier (Masséna)",
  estimatedReadyDate: '2025-09-02',
  steps: [
    {
      key: 'order',
      label: 'Commande validée & télétransmission',
      shortLabel: 'Commande',
      status: 'completed',
      description: '24 août 2025 · Tiers-Payant accepté',
    },
    {
      key: 'manufacturing',
      label: 'Surfaçage verres certifié Essilor',
      shortLabel: 'Fabrication',
      status: 'completed',
      description: '26 août 2025 · Usine de Créteil',
    },
    {
      key: 'fitting',
      label: 'Montage & Centrage laser',
      shortLabel: 'Montage',
      status: 'in_progress',
      description: "Étalonnage pupillaire 3D en cours d'exécution",
    },
    {
      key: 'ready',
      label: 'Mise en écrin & Prête en magasin',
      shortLabel: 'Prête',
      status: 'upcoming',
      description: 'Contrôle qualité 18 points finalisé',
    },
  ],
};

export const mockHealthAlert: HealthAlert = {
  kind: 'checkup',
  coverageLabel: '100% Pris en charge Sécu & Mutuelle',
  title: 'Votre contrôle de vue approche.',
  description:
    'Dernier bilan ophtalmologique : Septembre 2023 · Recommandé tous les 2 ans pour préserver votre confort visuel.',
  ctaLabel: 'Prendre rendez-vous',
};

export const mockStores: Store[] = [
  {
    id: 'store_nice_massena',
    fullName: "Générale d'Optique Nice Masséna",
    shortName: 'Nice Masséna',
    tag: 'Votre boutique',
    addressLine: '12 rue Masséna, 06000 Nice',
    distanceLabel: '450 m à pied',
    hoursLabel: "Ouvert aujourd'hui jusqu'à 19h30",
  },
  {
    id: 'store_nice_jean_medecin',
    fullName: "Générale d'Optique Nice Jean Médecin",
    shortName: 'Nice Jean Médecin · Nicetoile',
    addressLine: 'Centre commercial Nicetoile',
    distanceLabel: '1.1 km',
    hoursLabel: "Ouvert aujourd'hui jusqu'à 20h00",
  },
];

export const mockVisitMotifs: VisitMotif[] = [
  {
    id: 'motif_exam',
    label: 'Examen de vue approfondi',
    description: 'Réfraction complète, acuité & dépistage visuel',
    durationMinutes: 30,
    recommended: true,
  },
  {
    id: 'motif_lenses',
    label: 'Bilan & Adaptation lentilles',
    description: 'Contrôle de tolérance cornéenne & renouvellement',
    durationMinutes: 45,
  },
  {
    id: 'motif_frames',
    label: 'Essayage & Conseil style montures',
    description: 'Morphologie, marques créateurs & verres sur mesure',
    durationMinutes: 30,
  },
  {
    id: 'motif_repair',
    label: 'Ajustement & SAV atelier',
    description: 'Nettoyage ultrasons, plaquettes & alignement',
    durationMinutes: 15,
  },
];

export const mockTimeSlots: TimeSlot[] = [
  { id: 'slot_tomorrow', dayLabel: 'Demain', time: '14:15', practitioner: 'Dr Veyrat' },
  { id: 'slot_friday', dayLabel: 'Vendredi', time: '10:30', practitioner: 'Opticien R.' },
  { id: 'slot_saturday', dayLabel: 'Samedi', time: '11:00', practitioner: 'Dr Veyrat' },
];

export const mockCoupeFileWaitlistCount = 2;

export const mockLensRenewal: LensRenewal = {
  id: 'lens_acuvue_oasys_1day',
  type: '1-Day',
  productName: 'Acuvue Oasys 1-Day',
  productDescription: 'Boîte de 90 lentilles · Hydraluxe',
  deliveryEstimateLabel: 'Livraison estimée : 48h en boutique',
  prescriptionOD: '-2.25',
  prescriptionOG: '-2.00',
  price: 68.9,
};

export const mockPastOrders: PastOrder[] = [
  {
    id: 'ord_persol_714',
    category: 'Solaire polarisée',
    productName: 'Persol 714 Polarized',
    deliveredDateLabel: 'Livrée le 14 mai 2024',
    status: 'active',
    statusLabel: 'Garantie 2 ans active',
    action: 'invoice',
    actionLabel: 'Facture PDF',
  },
  {
    id: 'ord_chloe_acetate',
    category: 'Lunettes de repos',
    productName: 'Chloé Acétate Écaille',
    deliveredDateLabel: 'Livrée le 12 nov. 2023',
    status: 'archived',
    statusLabel: 'Dossier archivé',
    action: 'renew',
    actionLabel: 'Renouveler monture',
  },
];

export const mockPrescription: Prescription = {
  id: 'presc_2025_08',
  doctorName: 'Dr Sophie Dubois',
  doctorRole: 'Ophtalmologiste',
  doctorAddress: '12 Rue de la Paix, 75002 Paris',
  validUntilLabel: 'Sept. 2028',
  eyes: [
    { eyeLabel: 'OD (Droit)', sphere: '-2.50', cylinder: '-0.75', axis: '180°' },
    { eyeLabel: 'OG (Gauche)', sphere: '-2.25', cylinder: '-1.00', axis: '175°' },
  ],
  addition: '+1.75',
  pupillaryDistance: '62.5 mm',
  lensType: 'Verres progressifs',
};

export const mockMutuelle: MutuelleInfo = {
  provider: 'Harmonie Mutuelle',
  contractLabel: 'Contrat conventionné',
  formulaLabel: 'Formule Intégrale 100% Santé',
  teletransmissionNumber: '04 89 22 10 39',
  remainingCost: 0,
};

export const mockVisionCheckupReminder: VisionCheckupReminder = {
  title: 'Prochain bilan recommandé',
  description: "Idéal d'ici 11 mois pour contrôler la presbytie",
};

export const mockLensStockAlert: LensStockAlert = {
  productName: 'Acuvue Oasys · Bimensuelles',
  weeksRemaining: 3,
  prescriptionOD: '-2.50',
  prescriptionOG: '-2.25',
};

export const mockSecuritySettings: SecuritySettings = {
  biometricEnabled: true,
  twoFactorEnabled: true,
  connectedDevicesLabel: 'iPhone 16 Pro · Session en cours',
  connectedDevicesCount: 2,
};

export const mockVisionHistory: VisionHistoryPoint[] = [
  { year: '2022', label: '2022', od: -1.5, og: -1.25 },
  { year: '2023', label: '2023 (Contrôle)', od: -1.68, og: -1.42 },
  { year: '2024', label: '2024 (Stabilisé)', od: -1.75, og: -1.5 },
];

export const mockTiersPayantInfo: TiersPayantInfo = {
  title: 'Tiers-Payant Télétransmis',
  validUntilLabel: '31/12/2025',
  description:
    'Prise en charge intégrale monture classe A et verres amincis haute définition.',
};
