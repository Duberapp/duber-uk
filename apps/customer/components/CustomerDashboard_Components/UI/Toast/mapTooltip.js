import toast from "react-hot-toast";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Lottie from "lottie-react";
import toolTipImg from "../../../../public/assets/tool_tip.json";

const mapTooltip = (text) =>
  toast.custom(
    (t) => (
      <div
        className={`animate-enter max-w-sm w-80 sm:w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-slate-600 ring-opacity-5 py-3 px-3 items-center justify-between`}
      >
        <div className="flex items-center gap-x-3">
          <div className="w-12">
            <Lottie animationData={toolTipImg} loop={true} />
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-poppins font-semibold">
            {text}
          </p>
        </div>

        <XMarkIcon
          onClick={() => toast.dismiss(t.id)}
          className="cursor-pointer w-5 h-5 text-slate-600"
        />
      </div>
    ),
    { duration: 100000 }
  );

export default mapTooltip;
