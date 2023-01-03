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
