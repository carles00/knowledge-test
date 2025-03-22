import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { Dog } from "../Api/dogSlice";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface PieProps{
  dogBreeds: Dog[]
}

export default function PieComponent({dogBreeds}:PieProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={700} height={700}>
        <Pie
          data={dogBreeds}
          dataKey="nImages"
          nameKey={"breed"}
          labelLine={false}
          label={renderCustomizedLabel}
          cx="50%"
          cy="50%"
          outerRadius={200}
          fill="#8884d8"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
