import { useEffect, useState } from "react";
import DashboardCard from "../../DashboardCard";
import Chart from "../../../Chart";
import { Card, CardContent } from "../../../../ui/card";
import { ScrollArea } from "../../../../ui/scroll-area";
import DetailedCard from "../../DetailedCard";

interface SalesViewProps {
  data: any;
}

type TableDataT = { name: string; total_amount: number };

export default function SalesView({ data }: SalesViewProps) {
  const [tableData, setTableData] = useState<TableDataT[]>([
    {
      name: "Jan",
      total_amount: 0,
    },
    {
      name: "Feb",
      total_amount: 0,
    },
    {
      name: "Mar",
      total_amount: 0,
    },
    {
      name: "Apr",
      total_amount: 0,
    },
    {
      name: "May",
      total_amount: 0,
    },
    {
      name: "Jun",
      total_amount: 0,
    },
    {
      name: "Jul",
      total_amount: 0,
    },
    {
      name: "Aug",
      total_amount: 0,
    },
    {
      name: "Sep",
      total_amount: 0,
    },
    {
      name: "Oct",
      total_amount: 0,
    },
    {
      name: "Nov",
      total_amount: 0,
    },
    {
      name: "Dec",
      total_amount: 0,
    },
  ]);

  useEffect(() => {
    if (data) {
      const newData = tableData.map((item) => {
        const newItem = data.monthlySalesReport.find(
          (report: any) => report.month === item.name
        );

        return {
          name: item.name,
          total_amount: newItem ? newItem.total_amount : 0,
        };
      });

      setTableData(newData);
    }
  }, [data]);

  if (!data) return <></>;

  return (
    <main className="w-full">
      {/* Overview Cards Section */}
      <div className="flex items-center justify-between gap-x-2.5">
        <DashboardCard
          noIcon
          title="Total Revenue"
          infoText={`+${(
            (data.totalRevenue.totalRevenue /
              (data.totalRevenue.lastMonthRevenue === 0
                ? 1
                : data.totalRevenue.lastMonthRevenue)) *
            100
          ).toFixed(1)}% from last month`}
          mainText={`£${data.totalRevenue.totalRevenue}`}
        />
        <DashboardCard
          noIcon
          title="Subscriptions"
          infoText={`+${(
            (data.subscriptions.selectedRangeSubscriptions /
              (data.subscriptions.lastMonthSubscriptions === 0
                ? 1
                : data.subscriptions.lastMonthSubscriptions)) *
            100
          ).toFixed(1)}% from last month`}
          mainText={`+${data.subscriptions.selectedRangeSubscriptions}`}
        />
        <DashboardCard
          noIcon
          title="Sales"
          infoText={`+${(
            (data.sales.selectedRangeSales /
              (data.sales.lastMonthSales === 0
                ? 1
                : data.sales.lastMonthSales)) *
            100
          ).toFixed(1)}% from last month`}
          mainText={`+${data.sales.selectedRangeSales}`}
        />
        <DashboardCard
          noIcon
          title="Incomplete Sales"
          infoText={`+201 from yesterday`}
          mainText={`+${data.incompleteSales.selectedRangeIncompleteSales}`}
        />
      </div>

      <div className="mt-5 flex gap-x-2.5 h-full max-h-[30rem]">
        <Chart
          title="Overview"
          className="flex-1 h-[30rem]"
          chartData={tableData}
          XAxisProp={{
            dataKey: "name",
          }}
          YAxisProp={{
            tickFormatter: (value) => `$${value}`,
          }}
          barDataKey="total_amount"
        />

        <Card className="w-[40%]">
          <CardContent className="p-0">
            <ScrollArea className="h-[28rem]">
              <div className="py-4 px-6">
                <h3 className="text-base font-semibold">Recent Sales</h3>
                <p className="text-xs text-slate-500">
                  You made {(data.jobs.selectedRange as any[]).length} sales in
                  this month
                </p>
              </div>

              <div className="flex flex-col gap-y-5 px-4">
                {data.jobs.selectedRange.map((job: any) => (
                  <DetailedCard
                    type={job.SaleCategory}
                    topic={{
                      title: job.BookingType || job.AddonType,
                      subtitle: job.SaleCategory,
                    }}
                    content={{
                      subtitle: (job.AddonType || job.BookingType) as string,
                      title:
                        job.SaleCategory === "booking"
                          ? job.Orders.address
                          : job.SaleCategory === "addon" &&
                            job.AddonType === "Subscription"
                          ? job.Orders.storagePlan.slug === "basic"
                            ? "Free"
                            : "Premium"
                          : job.SaleCategory === "addon" &&
                            job.AddonType === "File_Recovery"
                          ? `#${job.Orders.id}`
                          : "",
                    }}
                    infoText={
                      job.SaleCategory === "booking"
                        ? [`£${job.Orders.amount}`, `#${job.Orders.id}`]
                        : job.SaleCategory === "addon"
                        ? `£${job.Orders.amount}`
                        : [`£${job.Orders.amount}`, `#${job.Orders.id}`]
                    }
                    onView={() => ""}
                    date={new Date(job.Orders.date).toLocaleDateString()}
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
