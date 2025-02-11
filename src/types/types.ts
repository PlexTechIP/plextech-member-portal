import { Dayjs } from 'dayjs';

export interface Request {
  id: string;
  item_description: string;
  amount: number;
  team_budget: string;
  is_food: boolean;
  images: Image[];
  status: string;
  user_id: string;
  comments: Comment[];
  date: Dayjs;
  first_name?: string;
  last_name?: string;
  bank_set?: boolean;
}

export interface Comment {
  message: String;
  first_name: String;
  last_name: String;
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
  id?: string;
  item_description: string;
  amount: string;
  team_budget: string;
  is_food: boolean;
  images: Image[];
  status: string;
  comments: Comment[];
}

export interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  google?: boolean;
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
  bank: {
    account_number?: string;
    routing_number?: string;
    bank_name?: string;
  };
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  registered: boolean;
  venmo?: VenmoProfile;
  strikes: Dayjs[];
  tardies: Dayjs[];
  absences: Dayjs[];
  treasurer: boolean;
  bluevineEmail?: string;
  bluevinePassword?: string;
  current_position?: string;
  profile_blurb?: string;
  linkedin_username?: string;
  instagram_username?: string;
  calendly_username?: string;
  current_company?: string;
  plaid_access_token?: string;
  plaid_item_id?: string;
  plaid_account_id?: string;
}

export interface Post {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  id?: string;
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
