export type PastOrderStatus = 'active' | 'archived';
export type PastOrderAction = 'invoice' | 'renew';

export interface PastOrder {
  id: string;
  category: string;
  productName: string;
  deliveredDateLabel: string;
  status: PastOrderStatus;
  statusLabel: string;
  action: PastOrderAction;
  actionLabel: string;
}
