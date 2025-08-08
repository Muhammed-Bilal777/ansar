export interface Donor {
  userId: string;
  amount: number;
  donatedAt: string;
  _id: string;
}

export interface Donation {
  _id: string;
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  image: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  donors: Donor[];
  slug: string;
  status: boolean;
}

export interface DonationResponse {
  message: string;
  donations: Donation[];
}
