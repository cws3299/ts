import useGetMultipleArtistTopTracks from "../../hooks/useGetMultipleArtistTopTracks";
import ArtistTopTracks from "./components/ArtistTopTracks";
import useGetNewReleases from "../../hooks/useGetNewReleases";
import NewReleases from "./components/NewReleases";
import { Box } from "@mui/material";

const HomePage = () => {
  const artistNameList = ["프로미스나인", "빅뱅"];

  const {
    data: artistTopTracksList,
    error,
    isLoading,
  } = useGetMultipleArtistTopTracks(artistNameList);

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        padding: 2,
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <NewReleases />

      {artistTopTracksList?.map((trackData, index) => (
        <ArtistTopTracks
          data={trackData}
          error={error}
          isLoading={isLoading}
          artistName={artistNameList[index]}
          key={index}
        />
      ))}
    </Box>
  );
};

export default HomePage;
