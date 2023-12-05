import {
  HomeModernIcon,
  CameraIcon,
  PhotoIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

export const expertisesList = [
  {
    id: 1,
    icon: <HomeModernIcon strokeWidth={1} className="w-8 h-8" />,
    text: "Building/Roof Inspections",
    slug: "Building/Roof Inspections",
  },
  {
    id: 2,
    icon: <CameraIcon strokeWidth={1} className="w-8 h-8" />,
    text: "Videography (Films, Docs)",
    slug: "Videography (Films, Docs)",
  },
  {
    id: 3,
    icon: <PhotoIcon strokeWidth={1} className="w-8 h-8" />,
    text: "Photography (Weddings)",
    slug: "Photography (Weddings)",
  },
  // {
  //     id: 4,
  //     icon: <FireIcon strokeWidth={1} className=' sm:w-12 sm:h-12 w-8 h-8' />,
  //     text: 'Thermal Imaging'
  // },
];

export const expertisesList_mobile = [
  {
    id: 1,
    icon: <CameraIcon strokeWidth={1} className="w-7 h-7" />,
    text: "Videography",
    slug: "Building/Roof Inspections",
  },
  {
    id: 2,
    icon: <PhotoIcon strokeWidth={1} className="w-7 h-7" />,
    text: "Photography",
    slug: "Videography (Films, Docs)",
  },
  {
    id: 3,
    icon: <HomeModernIcon strokeWidth={1} className="w-7 h-7" />,
    text: "Building/Roof Inspections",
    slug: "Photography (Weddings)",
  },
  // {
  //     id: 4,
  //     icon: <FireIcon strokeWidth={1} className=' sm:w-12 sm:h-12 w-8 h-8' />,
  //     text: 'Thermal Imaging'
  // },
];
