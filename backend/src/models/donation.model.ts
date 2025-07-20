import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId; // 👈 Add this line
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  slug: string;
  image?: string;
  status?: boolean;
  createdBy: mongoose.Types.ObjectId;
  donors: {
    userId: mongoose.Types.ObjectId;
    amount: number;
    donatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Medical',
        'Education',
        'Disaster Relief',
        'Community',
        'Environment',
      ],
      required: true,
    },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, unique: true },
    status: { type: Boolean, default: true },
    donors: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        amount: { type: Number },
        donatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

DonationSchema.pre('save', function (next) {
  if (!this.slug) this.slug = this._id.toString();
  next();
});

export const Donation = mongoose.model<IDonation>('Donation', DonationSchema);
