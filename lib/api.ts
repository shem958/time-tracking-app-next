import axios from 'axios';

export interface Activity {
  title: string;
  timeframes: {
    daily: { current: number; previous: number };
    weekly: { current: number; previous: number };
    monthly: { current: number; previous: number };
  };
}

const fetchActivityData = async (): Promise<Activity[]> => {
  const response = await axios.get("/data.json");
  return response.data;
};

export default fetchActivityData;

export enum TimeFrame {
  Daily,
  Weekly,
  Monthly,
}

export interface Timeframe {
  daily: { current: number; previous: number };
  weekly: { current: number; previous: number };
  monthly: { current: number; previous: number };
  [key: string]: { current: number; previous: number }; // Add index signature
}
