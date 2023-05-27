import { Dayjs } from 'dayjs';

export interface Request {
  _id: string;
  itemDescription: string;
  amount: number;
  teamBudget: string;
  isFood: boolean;
  images: Image[];
  status: string;
  user_id: string;
  comments: Comment[];
  date: Dayjs;
  firstName?: string;
  lastName?: string;
}

export interface Comment {
  message: String;
  firstName: String;
  lastName: String;
  date: Dayjs;
  user_id: string;
}

export interface Image {
  data: string | Blob;
  name: string;
  isBase64: boolean;
}

export interface AllRequests {
  pendingReview: Request[];
  underReview: Request[];
  errors: Request[];
  approved: Request[];
  paid: Request[];
}

export interface FormData {
  _id?: string;
  itemDescription: string;
  amount: string;
  teamBudget: string;
  isFood: boolean;
  images: Image[];
  status: string;
  comments: Comment[];
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  google?: boolean;
  teams: string[];
}

export interface LoginData {
  email: string;
  password?: string;
  google: boolean;
}

export interface VenmoProfile {
  display_name: string;
  profile_picture_url: string;
  username: string;
  id: string;
}

export interface User {
  bank: any;
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
  registered: boolean;
  venmo?: VenmoProfile;
  strikes: Dayjs[];
  tardies: Dayjs[];
  absences: Dayjs[];
  treasurer: boolean;
}

export interface Post {
  user_id?: string;
  firstName?: string;
  lastName?: string;
  _id: string;
  title: string;
  body: string;
  date: Dayjs;
  images: Image[];
  anonymous: boolean;
  private: boolean;
  upvotes: string[];
  downvotes: string[];
}

export interface Error {
  errorCode?: number;
  errorMessage?: string;
}
