import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

interface PersonalInfo {
  firstName: string;
  lastName: string;
  fatherName: string;
  birthday: string;
  address: string;
  position: string;
  candidate: string;
  height: string;
  weight: string;
  index: string;
  imageUrl: string;
}

interface SemiChart {
  percentage: number;
  label: string;
  color: string;
}

interface LineChart {
  labels: string[];
  data: number[];
}

interface KnowlodgeData {
  semicharts: SemiChart[];
  lineChart: LineChart;
  overall: string;
  thanOthers: number;
}

const InfoField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <h3 className="text-sm font-medium text-gray-500">{label}</h3>
    <p className="mt-1 text-lg text-gray-900">{value}</p>
  </div>
);

const PersonalInfoCard: React.FC<{ info: PersonalInfo }> = ({ info }) => (
  <div className="p-8">
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <img
          src={info.imageUrl}
          alt={`${info.firstName} ${info.lastName}`}
          className="h-48 w-48 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="mt-6 md:mt-0 md:ml-8 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900">
          {info.firstName} {info.lastName}
        </h1>
        <p className="mt-2 text-xl text-gray-600">{info.fatherName}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Туғилган сана:" value={info.birthday} />
          <InfoField label="Туғилган жой:" value={info.address} />
          <InfoField label="Лавозими:" value={info.position} />
          <InfoField label="Номзод:" value={info.candidate} />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">
            Физик кўрсаткичлар:
          </h3>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-gray-900">Бўйи: {info.height}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-900">Вазни: {info.weight}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-900">Индекс: {info.index}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [knowlodgeData, setKnowlodgeData] = useState<KnowlodgeData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personalResponse, knowlodgeResponse] = await Promise.all([
          fetch("https://trello.vimlc.uz/get-personal-info"),
          fetch("https://trello.vimlc.uz/knowlodge"),
        ]);

        if (!personalResponse.ok || !knowlodgeResponse.ok) {
          throw new Error("Маълумотларни юклашда хатолик юз берди");
        }

        const personalData: PersonalInfo = await personalResponse.json();
        const knowlodgeData: KnowlodgeData = await knowlodgeResponse.json();

        setPersonalInfo(personalData);
        setKnowlodgeData(knowlodgeData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Номаълум хатолик юз берди"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Юкланмоқда...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!personalInfo || !knowlodgeData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <PersonalInfoCard info={personalInfo} />

        <div className="p-8 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Билим тест натижалари
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowlodgeData.semicharts.map((chart, index) => (
              <div key={index} className="flex flex-col items-start">
                <h3 className="text-sm font-medium text-gray-500">
                  {chart.label}
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-6 mt-2">
                  <div
                    className="h-6 rounded-full"
                    style={{
                      width: `${chart.percentage}%`,
                      backgroundColor: chart.color,
                    }}
                  ></div>
                </div>
                <p className="text-gray-700 text-sm mt-1">
                  {chart.percentage}%
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Динамика</h3>
            <Line
              data={{
                labels: knowlodgeData.lineChart.labels,
                datasets: [
                  {
                    label: "Баллар",
                    data: knowlodgeData.lineChart.data,
                    fill: false,
                    borderColor: "#4CAF50",
                    tension: 0.3,
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      color: "#f3f3f3",
                    },
                  },
                },
              }}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">
              Умумий натижа: {knowlodgeData.overall}
            </h2>
            <p className="text-gray-600">
              {knowlodgeData.thanOthers}% иштирокчилардан яхшироқ натижа
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
