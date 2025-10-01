export default interface TransactionHistory {
  id: string;
  name: string;
  icon: string;
  value: string;
  date: Date | null;
  category?: string;
  quantity?: number;
  type: 'C' | 'D';
}
