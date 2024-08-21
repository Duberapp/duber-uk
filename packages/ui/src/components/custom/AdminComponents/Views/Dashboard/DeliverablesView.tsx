import DashboardCard from "../../DashboardCard";
import Chart from "../../../Chart";
import { Card, CardContent } from "../../../../ui/card";
import { ScrollArea } from "../../../../ui/scroll-area";
import DetailedCard from "../../DetailedCard";

interface DeliverablesViewProps {
  data: any;
}

const demoData = [
  {
    name: "Jan",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Feb",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Mar",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Apr",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "May",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Jun",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Jul",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Aug",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Sep",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Oct",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Nov",
    size: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Dec",
    size: Math.floor(Math.random() * 100) + 1,
  },
];

export default function DeliverablesView({ data }: DeliverablesViewProps) {
  if (!data) return <></>;

  return (
    <main className="w-full">
      {/* Overview Cards Section */}
      <div className="flex items-center justify-between gap-x-2.5">
        <DashboardCard
          noIcon
          title="Total Size"
          infoText="+20.1% from last month"
          mainText="120GB"
        />
        <DashboardCard
          noIcon
          title="Average Size"
          infoText="+180.1% from last month"
          mainText="4.3GB"
        />
        <DashboardCard
          noIcon
          title="Videos"
          infoText="+19% from last month"
          mainText="+12,234"
        />
        <DashboardCard
          noIcon
          title="Photos"
          infoText="+201 from yesterday"
          mainText="+573"
        />
      </div>

      <div className="mt-5 flex gap-x-2.5 h-full max-h-[30rem]">
        <Chart
          title="Overview"
          className="flex-1 h-[30rem]"
          chartData={demoData}
          XAxisProp={{ dataKey: "name" }}
          YAxisProp={{ tickFormatter: (value) => `${value}GB` }}
          barDataKey="size"
        />

        <Card className="w-[40%]">
          <CardContent className="p-0">
            <ScrollArea className="h-[28rem]">
              <div className="py-4 px-6">
                <h3 className="text-base font-semibold">Expiring Links</h3>
                <p className="text-xs text-slate-500">
                  5 links expiring this month
                </p>
              </div>

              <div className="flex flex-col gap-y-5 px-4">
                <DetailedCard
                  type="expiring_link"
                  topic={{
                    subtitle: "Required Expertise",
                    title: "Assets Management",
                  }}
                  content={{ title: "Portsmouth, UK", subtitle: "Location" }}
                  infoText={"10 Days"}
                  onView={() => ""}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type="expiring_link"
                  topic={{
                    subtitle: "Required Expertise",
                    title: "Assets Management",
                  }}
                  content={{ title: "Portsmouth, UK", subtitle: "Location" }}
                  infoText={"5 Days"}
                  onView={() => ""}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type="expiring_link"
                  topic={{
                    subtitle: "Required Expertise",
                    title: "Assets Management",
                  }}
                  content={{ title: "Portsmouth, UK", subtitle: "Location" }}
                  infoText={"Expired"}
                  onView={() => ""}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type="expiring_link"
                  topic={{
                    subtitle: "Required Expertise",
                    title: "Assets Management",
                  }}
                  content={{ title: "Portsmouth, UK", subtitle: "Location" }}
                  infoText={"Today"}
                  onView={() => ""}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type="expiring_link"
                  topic={{
                    subtitle: "Required Expertise",
                    title: "Assets Management",
                  }}
                  content={{ title: "Portsmouth, UK", subtitle: "Location" }}
                  infoText={"Expired"}
                  onView={() => ""}
                  date={new Date().toLocaleDateString()}
                />
                <DetailedCard
                  type="expiring_link"
                  topic={{
                    subtitle: "Required Expertise",
                    title: "Assets Management",
                  }}
                  content={{ title: "Portsmouth, UK", subtitle: "Location" }}
                  infoText={"4 Days"}
                  onView={() => ""}
                  date={new Date().toLocaleDateString()}
                />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
