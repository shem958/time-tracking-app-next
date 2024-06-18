import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import ActivityCard from "./ActivityCard";
import { Activity, Timeframe } from "../lib/api"; // Import Timeframe instead of TimeFrame
import { PacmanLoader } from "react-spinners";

const Dashboard = ({
  data,
  error,
  isLoading,
}: {
  data: Activity[];
  error: Error | null;
  isLoading: boolean;
}) => {
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  ); // Adjust useState to match Timeframe keys
  const [delayedData, setDelayedData] = useState<Activity[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedData(data);
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
      <div className="mb-8 flex space-x-4">
        <button
          onClick={() => setTimeFrame("daily")}
          className={`text-white px-4 py-2 rounded ${
            timeFrame === "daily" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setTimeFrame("weekly")}
          className={`text-white px-4 py-2 rounded ${
            timeFrame === "weekly" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeFrame("monthly")}
          className={`text-white px-4 py-2 rounded ${
            timeFrame === "monthly" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Monthly
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProfileCard name="Jeremy Robson" />
        </div>
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {delayedData ? (
            delayedData.map((activity) => (
              <ActivityCard
                key={activity.title}
                activity={activity.title}
                hours={activity.timeframes[timeFrame].current}
                lastWeekHours={activity.timeframes[timeFrame].previous}
                color={getColor(activity.title)}
              />
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-full min-h-screen">
              <PacmanLoader color="#ffffff" size={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getColor = (title: string) => {
  switch (title) {
    case "Work":
      return "bg-orange-500";
    case "Play":
      return "bg-teal-500";
    case "Study":
      return "bg-pink-500";
    case "Exercise":
      return "bg-green-500";
    case "Social":
      return "bg-purple-500";
    case "Self Care":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export default Dashboard;
