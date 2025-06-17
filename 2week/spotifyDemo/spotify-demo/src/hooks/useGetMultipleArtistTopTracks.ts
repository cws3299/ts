import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getArtistTopTracks } from "../api/trackApi";
import getArtistId from "../utils/getArtistId";
import { GetArtistTopTrackResponse } from "../models/track";

const useGetMultipleArtistTopTracks = (artistNames: string[]) => {
  const clientToken = useClientCredentialToken();
  const artistIds = getArtistId(artistNames);

  return useQuery<GetArtistTopTrackResponse[]>({
    queryKey: ["multiple-artist-top-tracks", artistIds],
    enabled: !!clientToken && artistIds?.length > 0,
    queryFn: async () => {
      const promises = artistIds.map((id) =>
        getArtistTopTracks(clientToken!, id)
      );
      return Promise.all(promises);
    },
  });
};

export default useGetMultipleArtistTopTracks;
