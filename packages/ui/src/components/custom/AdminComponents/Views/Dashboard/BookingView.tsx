import DashboardCard from "../../DashboardCard";
import Chart from "../../../Chart";
import { Card, CardContent } from "../../../../ui/card";
import { ScrollArea } from "../../../../ui/scroll-area";
import DetailedCard from "../../DetailedCard";
import { useEffect, useState } from "react";
import {
  Tables,
  type Tables as CustomerTables,
} from "supabase-config/types/customer.supabase";

interface BookingViewProps {
  data: any;
}

const demoData = [
  {
    expertise: "Assets Management",
    precentage: Math.floor(Math.random() * 100) + 1,
  },
  {
    expertise: "Marketing",
    precentage: Math.floor(Math.random() * 100) + 1,
  },
  {
    expertise: "Social Events",
    precentage: Math.floor(Math.random() * 100) + 1,
  },
];

export default function BookingView({ data }: BookingViewProps) {
  const [tableData, setTableData] = useState([
    {
      expertise: "Assets Management",
      slug: "asset_management",
      count: 0,
      precentage: 0,
    },
    {
      expertise: "Marketing",
      slug: "marketing",
      count: 0,
      precentage: 0,
    },
    {
      expertise: "Social Events",
      slug: "social_events",
      count: 0,
      precentage: 0,
    },
  ]);

  if (!data) return <></>;

  useEffect(() => {
    if (data) {
      let newData = tableData.map((item) => {
        let newItem = {
          ...item,
          count: 0,
        };

        // loop through jobs data
        data.bookingData.selectedRange.map(
          (booking: CustomerTables<"Orders">) => {
            if (booking.pilotExpertize === item.slug) {
              newItem.count += 1;
            }
          }
        );

        // Push new item to table data
        return newItem;
      });

      // Prepare precentage
      newData = newData.map((item) => {
        return {
          ...item,
          precentage: Math.floor(
            (item.count / data.totalBookings.selectedRange) * 100
          ),
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
          title="Total Bookings"
          infoText={`+${(
            (data.totalBookings.selectedRange /
              (data.totalBookings.lastMonth === 0
                ? 1
                : data.totalBookings.lastMonth)) *
            100
          ).toFixed(1)}% from last month`}
          mainText={`+${data.totalBookings.selectedRange}`}
        />
        <DashboardCard
          noIcon
          title="Unassigned"
          infoText={`+${(
            (data.unassignedBookings.selectedRange /
              (data.unassignedBookings.lastMonth === 0
                ? 1
                : data.unassignedBookings.lastMonth)) *
            100
          ).toFixed(1)}% from last month`}
          mainText={`+${data.unassignedBookings.selectedRange}`}
        />
        <DashboardCard
          noIcon
          title="Live"
          infoText={`+${(
            (data.liveBookings.selectedRange /
              (data.liveBookings.lastMonth === 0
                ? 1
                : data.liveBookings.lastMonth)) *
            100
          ).toFixed(1)}% from last month`}
          mainText={`+${data.liveBookings.selectedRange}`}
        />
        <DashboardCard
          noIcon
          title="Completed"
          infoText={`+${(
            (data.completedBookings.selectedRange /
              (data.completedBookings.lastMonth === 0
                ? 1
                : data.completedBookings.lastMonth)) *
            100
          ).toFixed(1)}% from last month`}
          mainText={`+${data.completedBookings.selectedRange}`}
        />
      </div>

      <div className="mt-5 flex gap-x-2.5 h-full max-h-[30rem]">
        <Chart
          title="Popular Expertise"
          className="flex-1 h-[30rem]"
          chartData={tableData}
          XAxisProp={{ dataKey: "expertise" }}
          YAxisProp={{ tickFormatter: (value) => `${value}%` }}
          barDataKey="precentage"
        />

        <Card className="w-[40%]">
          <CardContent className="p-0">
            <ScrollArea className="h-[28rem]">
              <div className="py-4 px-6">
                <h3 className="text-base font-semibold">Cancelled Booking</h3>
                <p className="text-xs text-slate-500">
                  {data.cancelledBookings.length} cancellations in this month
                </p>
              </div>

              <div className="flex flex-col gap-y-5 px-4">
                {data.cancelledBookings.length > 0 &&
                  data.cancelledBookings.map((booking: Tables<"Orders">) => (
                    <DetailedCard
                      type="cancel"
                      topic={{ title: booking.pilotExpertize as string }}
                      content={{ title: booking.cancelled_by as string }}
                      infoText={`#${booking.id}`}
                      onView={() => ""}
                      date={new Date(booking.date!).toLocaleDateString()}
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
