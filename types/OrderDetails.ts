export default interface OrderDetails {
  id: string;
  title: string;
  client: string;
  technician?: string;
  date: string;
  status: string;
  price: number;
  description: string;
  completedAt?: string;
  paidAt?: string;
}