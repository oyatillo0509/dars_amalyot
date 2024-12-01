import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const personalQualitiesLeft = [
  { label: "Мақсадга интилувчанлик", percentage: 90 },
  { label: "Эмоционал интеллект", percentage: 95 },
  { label: "Креативлик", percentage: 75 },
  { label: "Ходимларга йўналганлик", percentage: 86 },
];

const personalQualitiesRight = [
  { label: "Топшириқларга йўналганлик", percentage: 95 },
  { label: "Фаол ижтимоий муносабатлар", percentage: 75 },
  { label: "Ўз устида ишлаш", percentage: 86 },
  { label: "Муаммоли вазиятга йўналганлик", percentage: 86 },
];

const radarData = {
  labels: ["Photoshop", "Illustrator", "InDesign", "Premiere", "XD"],
  datasets: [
    {
      label: "Skills",
      data: [80, 90, 75, 70, 85],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
    },
  ],
};

const Personal = () => {
  return (
    <div className=" bg-gray-100 ">
      <div className="max-w-6xl mx-auto bg-white ">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            Шахсий ва касбий хусусиятлар
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Side */}
            <div>
              {personalQualitiesLeft.map((quality, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {quality.label}
                    </span>
                    <span className="text-sm font-medium">
                      {quality.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${quality.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <div className="w-64 h-64">
                <Radar data={radarData} options={{ responsive: true }} />
              </div>
            </div>

            <div>
              {personalQualitiesRight.map((quality, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {quality.label}
                    </span>
                    <span className="text-sm font-medium">
                      {quality.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${quality.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
