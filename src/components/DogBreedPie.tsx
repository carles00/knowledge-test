import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Dog } from "../types/dog";
import { useState } from "react";

const COLORS = [
  "#f63838",
  "#ff1693",
  "#e358ed",
  "#7f96ff",
  "#00b1fb",
  "#00bad7",
  "#00c5b0",
  "#00d45f",
  "#9dcc00",
  "#fab70a",
];
const RADIAN = Math.PI / 180;

interface renderCustomizedLabelObject {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  breed: string;
}
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: renderCustomizedLabelObject) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if(percent * 100 <= 0.5){
    return <></>
  }

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

interface PieProps {
  dogBreeds: Dog[];
}

export default function DogBreedPie({ dogBreeds }: PieProps) {
  const [showAllBreeds, setShowAllBreeds] = useState<boolean>(false);

  const toggleShowAllBreeds = () => {
    setShowAllBreeds((prev) => !prev);
  };

  const getBreedsToShow = (): Dog[] => {
    if (!showAllBreeds) {
      return dogBreeds.filter((_dog, idnex) => idnex < 10);
    }

    return dogBreeds;
  };

  return (
    <>
      <button
        onClick={() => {
          toggleShowAllBreeds();
        }}
      >
        {showAllBreeds ? "Show top 10 breeds" : "Show all dog breeds"}
      </button>
      <ResponsiveContainer width="70%" height="70%">
        <PieChart width={700} height={700}>
          <Pie
            data={getBreedsToShow()}
            dataKey="nImages"
            nameKey={"breed"}
            labelLine={true}
            label={renderCustomizedLabel}
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill="#8884d8"
          >
            {dogBreeds.map((_entry, index) => (
              <Cell
                className="pie_cell"
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
