import { useEffect } from "react";
import "./App.css";
import { useAppDispath, useAppSelector } from "./features/store";
import {
  fetchDogBreeds,
  selectAllDogs,
  selectDogStatus,
} from "./features/dogSlice";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx : number;
  cy : number;
  midAngle : number;
  innerRadius : number;
  outerRadius : number;
  percent : number;
  index : number;
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

export default function App() {
  const dispatch = useAppDispath();
  const dogBreeds = useAppSelector(selectAllDogs);
  const dogStatus = useAppSelector(selectDogStatus);

  useEffect(() => {
    if (dogStatus === "idle") {
      dispatch(fetchDogBreeds());
    }
  }, [dogStatus, dispatch]);

  return (
    <>
      <main className="main">
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
      </main>
    </>
  );
}
