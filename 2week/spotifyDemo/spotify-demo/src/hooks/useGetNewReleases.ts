import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../api/albumApi";

const useGetNewReleases = () => {
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: () => {
      return getNewReleases();
    },
  });
};
