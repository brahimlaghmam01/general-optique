export interface PrescriptionEye {
  eyeLabel: string;
  sphere: string;
  cylinder: string;
  axis: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  doctorRole: string;
  doctorAddress: string;
  validUntilLabel: string;
  eyes: PrescriptionEye[];
  addition: string;
  pupillaryDistance: string;
  lensType: string;
}
