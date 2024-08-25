import DashboardCard from "../../DashboardCard";
import Chart from "../../../Chart";
import { Card, CardContent } from "../../../../ui/card";
import { ScrollArea } from "../../../../ui/scroll-area";
import DetailedCard from "../../DetailedCard";
import { useEffect, useState } from "react";

interface DeliverablesViewProps {
  data: any;
}

export default function DeliverablesView({ data }: DeliverablesViewProps) {
  const [tableData, setTableData] = useState([
    {
      name: "Jan",
      size: 0,
    },
    {
      name: "Feb",
      size: 0,
    },
    {
      name: "Mar",
      size: 0,
    },
    {
      name: "Apr",
      size: 0,
    },
    {
      name: "May",
      size: 0,
    },
    {
      name: "Jun",
      size: 0,
    },
    {
      name: "Jul",
      size: 0,
    },
    {
      name: "Aug",
      size: 0,
    },
    {
      name: "Sep",
      size: 0,
    },
    {
      name: "Oct",
      size: 0,
    },
    {
      name: "Nov",
      size: 0,
    },
    {
      name: "Dec",
      size: 0,
    },
  ]);

  if (!data) return <></>;

  useEffect(() => {
    if (data) {
      const newData = tableData.map((item) => {
        const newItem = data.monthlySizes[item.name];

        return {
          name: item.name,
          size: newItem ? newItem : 0,
        };
      });

      setTableData(newData);
    }
  }, [data]);

  return (
    <main className="w-full">
      {/* Overview Cards Section */}
      <div className="flex items-center justify-between gap-x-2.5">
        <DashboardCard
          noIcon
          title="Total Size"
          // infoText="+20.1% from last month"
          mainText={`${(data.totalBucketSize as number).toFixed(1)}GB`}
        />
        <DashboardCard
          noIcon
          title="Average Size"
          // infoText="+180.1% from last month"
          mainText={`${(data.averageFolderSize as number).toFixed(1)}GB`}
        />
        <DashboardCard
          noIcon
          title="Videos"
          // infoText="+19% from last month"
          mainText={`+${data.totalVideoFiles as number}`}
        />
        <DashboardCard
          noIcon
          title="Photos"
          // infoText="+201 from yesterday"
          mainText={`+${data.totalPhotoFiles as number}`}
        />
      </div>

      <div className="mt-5 flex gap-x-2.5 h-full max-h-[30rem]">
        <Chart
          title="Overview"
          className="flex-1 h-[30rem]"
          chartData={tableData}
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
                {data.expiring_links.length > 0 &&
                  data.expiring_links.map((sale: any) => (
                    <DetailedCard
                      type="expiring_link"
                      topic={{
                        subtitle: "Required Expertise",
                        title: sale.Orders.pilotExpertize,
                      }}
                      content={{
                        title: sale.Orders.address,
                        subtitle: "Location",
                      }}
                      infoText={"10 Days"}
                      onView={() => ""}
                      date={new Date().toLocaleDateString()}
                    />
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
