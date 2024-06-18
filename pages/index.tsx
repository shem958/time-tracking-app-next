import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import fetchActivityData, { Activity } from "../lib/api";
import "../styles/globals.css";

const Home: React.FC = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activityData = await fetchActivityData();
        setData(activityData);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return <Dashboard data={data} error={error} isLoading={isLoading} />;
};

export default Home;
