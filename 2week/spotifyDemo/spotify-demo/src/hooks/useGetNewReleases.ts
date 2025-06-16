import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../api/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = () => {
  const clientToken = useClientCredentialToken();
  console.log("useGetNewReleases 여기 먼저 탐");

  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!clientToken) throw new Error("No token available");

      return getNewReleases(clientToken);
    },
  });
};

export default useGetNewReleases;
