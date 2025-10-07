import { useQuery } from "@tanstack/react-query";

export interface NowData {
  lastUpdated: string;
  currentWork: string;
  learning: string[];
  status: string;
}

const fetchNowData = async (): Promise<NowData> => {
  const response = await fetch("/data/now.json");
  if (!response.ok) {
    throw new Error("Failed to fetch now data");
  }
  return response.json();
};

export const useNowData = () => {
  return useQuery({
    queryKey: ["now"],
    queryFn: fetchNowData,
  });
};
