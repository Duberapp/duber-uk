import { Card } from "../../ui/card";
import DuberButton from "../DuberButton";

type DetailedCardProps = {
  type: "booking" | "addon" | "cancel" | "expiring_link";
  date: string;
  topic: { title: string; subtitle?: string };
  content: { title: string; subtitle?: string };
  infoText?: string | string[];
  onView: () => void;
  className?: string;
};

export default function DetailedCard({
  className,
  content,
  date,
  onView,
  topic,
  type,
  infoText,
}: DetailedCardProps) {
  // Function to get the title and subtitle of the content
  function getContentTitle(): { title: string; subtitle: string } {
    let preparedTitle = { title: "", subtitle: "" };

    if (type === "booking") {
      let titleArr = (content.title as string).split(",");
      preparedTitle = {
        title: `
        ${titleArr[titleArr.length - 2]}, 
        ${titleArr[titleArr.length - 1]}`,
        subtitle: "Booking",
      };
    } else if (type === "addon") {
      let sub = "";

      if (content.subtitle === "Subscription") {
        sub = "Plan";
      } else if (content.subtitle === "File_Recovery") {
        sub = "Booking ID";
      }

      preparedTitle = {
        title: content.title,
        subtitle: sub,
      };
    }

    return preparedTitle;
  }

  return (
    <Card
      className={`p-2 pb-3 shadow-md bg-white border border-slate-100 ${className}`}
    >
      <div className="w-full bg-duber-navyBlue flex items-center justify-between p-3 rounded-lg">
        <div className="">
          <p className="text-[10px] text-white normal-case">
            {type === "cancel"
              ? "Required Expertise"
              : (topic.subtitle as string)[0].toUpperCase() +
                (topic.subtitle as string).slice(1)}
          </p>
          <p className="text-[14px] text-white font-semibold">
            {(topic.title as string).replace("_", " ")}
          </p>
        </div>

        <div className="flex items-center gap-x-2">
          {typeof infoText === "string" ? (
            <p className="font-bold text-duber-pink text-[14px]">{infoText}</p>
          ) : (
            infoText?.map((text, index) => (
              <p
                key={index}
                className={`${
                  index === 0 ? "font-bold" : "font-normal"
                } text-[14px] text-duber-pink`}
              >
                {text}
              </p>
            ))
          )}
        </div>
      </div>

      <div className="mt-2 pl-3 flex items-center justify-between">
        {/* Col 1 */}
        <div className="">
          <p className="text-[10px] text-duber-navyBlue">
            {type === "cancel"
              ? "Person that cancelled"
              : getContentTitle().subtitle}
          </p>
          <p className="text-[14px] text-duber-navyBlue">
            {getContentTitle().title}
          </p>
        </div>

        {/* Col 2 */}
        <div className="">
          <p className="text-[10px] text-duber-navyBlue">Date</p>
          <p className="text-[14px] text-duber-navyBlue">{date}</p>
        </div>

        {/* Col 3 */}
        <div className="">
          <DuberButton
            onClick={onView}
            className="bg-duber-teal hover:bg-duber-teal-dark text-white uppercase font-semibold"
          >
            View
          </DuberButton>
        </div>
      </div>
    </Card>
  );
}
