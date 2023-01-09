export interface Request {
  _id: string;
  itemDescription: string;
  amount: number;
  teamBudget: string;
  isFood: boolean;
  images: Image[];
  status: string;
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
  declined: Request[];
}

export interface FormData {
  _id?: string;
  itemDescription: string;
  amount: string;
  teamBudget: string;
  isFood: boolean;
  images: Image[];
  status: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  venmo: string;
  google?: boolean;
}

export interface LoginData {
  email: string;
  password?: string;
  google: boolean;
}
