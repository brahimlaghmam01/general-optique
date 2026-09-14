export interface VisionCheckupReminder {
  title: string;
  description: string;
}

export interface LensStockAlert {
  productName: string;
  weeksRemaining: number;
  prescriptionOD: string;
  prescriptionOG: string;
}
