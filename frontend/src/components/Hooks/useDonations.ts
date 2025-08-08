import { useState, useEffect } from "react";
import type { Donation, DonationResponse } from "../types/donation";

export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch("/api/donations");

        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }

        const data: DonationResponse = await response.json();
        setDonations(data.donations.filter((donation) => donation.status));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // For demo purposes, using mock data
        setDonations(mockDonations);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();

    // Set up polling for real-time updates every 30 seconds
    const interval = setInterval(fetchDonations, 30000);

    return () => clearInterval(interval);
  }, []);

  return { donations, loading, error };
}

// Mock data for development/demo
export const mockDonations: Donation[] = [
  {
    _id: "68766c6b4ee7fd45f3f4de5d",
    title: "Support Surgery for Premature Baby",
    description:
      "Help baby Ayaan get critical surgery after being born premature at 7 months.",
    category: "Medical",
    targetAmount: 200000,
    currentAmount: 3000,
    deadline: "2025-09-30T00:00:00.000Z",
    image: "https://example.com/images/ayaan-medical.jpg",
    createdBy: "687663b5677ec6bdd1d33a20",
    createdAt: "2025-07-15T14:57:47.233Z",
    updatedAt: "2025-07-25T14:27:01.772Z",
    __v: 2,
    donors: [
      {
        userId: "687663b5677ec6bdd1d33a20",
        amount: 500,
        donatedAt: "2025-07-15T15:26:41.375Z",
        _id: "68767331a5a19bf7dc71f354",
      },
      {
        userId: "68819d5797dbaa0335f6f9da",
        amount: 2500,
        donatedAt: "2025-07-25T14:27:01.770Z",
        _id: "68819f2697dbaa0335f6f9f6",
      },
    ],
    slug: "68766c6b4ee7fd45f3f4de5d",
    status: true,
  },
  {
    _id: "68767476a5a19bf7dc71f360",
    title: "Emergency Food Relief Program",
    description:
      "Providing emergency food supplies to families affected by recent floods.",
    category: "Emergency",
    targetAmount: 200000,
    currentAmount: 4000,
    deadline: "2025-09-30T00:00:00.000Z",
    image: "https://example.com/images/ayaan-medical.jpg",
    createdBy: "687663b5677ec6bdd1d33a20",
    donors: [
      {
        userId: "687663b5677ec6bdd1d33a20",
        amount: 500,
        donatedAt: "2025-07-15T17:56:39.649Z",
        _id: "6876965738345dd8a30441b9",
      },
    ],
    createdAt: "2025-07-15T15:32:06.037Z",
    updatedAt: "2025-07-16T16:19:27.352Z",
    slug: "68767476a5a19bf7dc71f360",
    status: true,
    __v: 8,
  },
  {
    _id: "6877d5d36bfb5c82ff76580b",
    title: "Education Support for Underprivileged Children",
    description:
      "Providing school supplies and educational resources to children in need.",
    category: "Education",
    targetAmount: 200000,
    currentAmount: 5500,
    deadline: "2025-09-30T00:00:00.000Z",
    image: "https://example.com/images/ayaan-medical.jpg",
    createdBy: "687663b5677ec6bdd1d33a20",
    status: true,
    donors: [
      {
        userId: "687663b5677ec6bdd1d33a20",
        amount: 5000,
        donatedAt: "2025-07-24T02:33:32.424Z",
        _id: "6877d6df0b060fc5386ca52f",
      },
      {
        userId: "68819d5797dbaa0335f6f9da",
        amount: 500,
        donatedAt: "2025-07-24T02:42:24.197Z",
        _id: "68819d9087dbaa0335f6f9e0",
      },
    ],
    createdAt: "2025-07-16T16:39:47.268Z",
    updatedAt: "2025-07-24T02:42:24.202Z",
    slug: "6877d5d36bfb5c82ff76580b",
    __v: 2,
  },
];
