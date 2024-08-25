import React from "react";
import { Card, CardContent } from "../ui/card";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
// import { ChartTooltip, ChartTooltipContent } from "../ui/chart";

interface CardProps {
  title: string;
  className?: string;
  chartHeight?: number;
  chartData: Object[];
  XAxisProp: {
    dataKey: string;
  };
  YAxisProp: {
    tickFormatter: (value: string, index: number) => string;
  };
  barDataKey: string;
}

export default function Chart({
  title,
  className,
  chartHeight = 400,
  chartData,
  XAxisProp,
  YAxisProp,
  barDataKey,
}: CardProps) {
  return (
    <Card className={`${className}`}>
      <CardContent className="p-0 pr-2">
        <p className="font-semibold p-4">{title}</p>

        <div className="h-full flex items-center justify-center">
          <ResponsiveContainer width={"100%"} height={chartHeight}>
            <BarChart data={chartData}>
              <XAxis
                dataKey={XAxisProp.dataKey}
                tickLine={false}
                axisLine={false}
                stroke={"#888888"}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke={"#888888"}
                fontSize={12}
                tickFormatter={YAxisProp.tickFormatter}
              />
              <Bar dataKey={barDataKey} radius={[4, 4, 0, 0]} fill="#0b2c60" />
              {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
