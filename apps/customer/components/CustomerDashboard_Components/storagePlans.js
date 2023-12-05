import {
  ArrowDownTrayIcon,
  CloudArrowDownIcon,
} from "@heroicons/react/24/outline";

export const plans = [
  {
    id: 1,
    icon: (
      <ArrowDownTrayIcon
        strokeWidth={1.4}
        className="sm:w-8 sm:h-8 w-10 h-10"
      />
    ),
    text: "1 Month Download Link (Free)",
  },
  {
    id: 2,
    icon: (
      <CloudArrowDownIcon
        strokeWidth={1.4}
        className="sm:w-8 sm:h-8 w-10 h-10"
      />
    ),
    text: "Cloud Hosting (£10/month)",
  },
];
