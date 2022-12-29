export interface Request {
  id: string;
  itemDescription: string;
  amount: number;
  teamBudget: string;
  isFood: boolean;
  images: any[];
  status: string;
}

export interface AllRequests {
  pendingReview: Request[];
  underReview: Request[];
  errors: Request[];
  approved: Request[];
  declined: Request[];
}
