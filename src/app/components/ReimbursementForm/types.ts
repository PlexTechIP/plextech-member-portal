import { Image } from '../RequestsBoard/types';

export default interface FormData {
  _id?: string;
  itemDescription: string;
  amount: string;
  teamBudget: string;
  isFood: boolean;
  images: Image[];
  status: string;
}
