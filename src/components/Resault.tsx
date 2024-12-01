import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Resault: React.FC = () => {
  const data = [
    { label: "Стратегик фикрлаш", percentage: 85, color: "#22c55e" },
    { label: "Лидерлик", percentage: 100, color: "#2563eb" },
    { label: "Натижага йўналганлик", percentage: 75, color: "#22c55e" },
    { label: "Ўз-ўзини ривожлантириш", percentage: 98, color: "#22c55e" },
    { label: "Ўзгаришларни бошқариш", percentage: 33, color: "#ef4444" },
    { label: "Коммуникативлик", percentage: 45, color: "#f59e0b" },
  ];

  const renderDoughnut = (item: { percentage: number; color: string }) => (
    <div className="relative w-20 h-20">
      <Doughnut
        data={{
          datasets: [
            {
              data: [item.percentage, 100 - item.percentage],
              backgroundColor: [item.color, "#e5e7eb"],
              borderWidth: 0,
            },
          ],
        }}
        options={{
          cutout: "75%",
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false },
          },
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
        {item.percentage}%
      </div>
    </div>
  );

  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white ">
        <div className="p-8">
          <h2 className="text-xl font-bold mb-6 border-l-4 pl-4 border-blue-600">
            Компетенцияларнинг намоён бўлиши
          </h2>
          <div className="flex justify-between items-start space-x-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {renderDoughnut(item)}
                  <span className="text-gray-700 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="ml-6 flex justify-center items-center">
              <img
                src="/src/img/Oyatillo.jpg"
                alt="QR Code"
                className="w-36 h-36"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resault;
