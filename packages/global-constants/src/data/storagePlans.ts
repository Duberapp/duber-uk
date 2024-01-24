import { type StoragePlanType } from "../types";

export const storage_plans: StoragePlanType[] = [
  {
    id: 1,
    slug: 'basic',
    text: "1 Month Download Link (Free)",
    features: [
      "1 Month Download Link",
      "Files will be deleted after 1 month",
      "1 Month starts from date of booking",
      "Option to recover files for £95.00"
    ],
    price: 'free'
  },
  {
    id: 2,
    slug: 'premium',
    text: "Cloud Hosting (£10/month)",
    features: [
      "Unlimited downloads",
      "Files will never be deleted",
      "24hr Online Support",
      "Access to inspectAI",
    ],
    price: 10
  }
]