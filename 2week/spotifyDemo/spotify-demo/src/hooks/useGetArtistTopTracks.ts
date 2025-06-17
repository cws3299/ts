import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getArtistTopTracks } from "../api/trackApi";

const useGetArtistTopTracks = (artistId: string | undefined) => {
  const clientToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["main-artist-top-track", artistId],
    queryFn: async () => {
      if (!clientToken) throw new Error("No token avaliable");
      if (!artistId) throw new Error("No ArtistId");

      return getArtistTopTracks(clientToken, artistId);
    },
    enabled: !!clientToken && !!artistId,
  });
};

export default useGetArtistTopTracks;

// 24nUVBIlCGi4twz4nYxJum
