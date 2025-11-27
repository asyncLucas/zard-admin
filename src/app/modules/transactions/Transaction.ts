
export interface Transaction {
  id: string;
  seller: string;
  description?: string;
  amount: number;
  date: string;
  fileUrl?: string;
}
