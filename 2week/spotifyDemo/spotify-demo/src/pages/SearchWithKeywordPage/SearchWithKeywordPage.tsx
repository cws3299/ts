import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useParams } from "react-router";
import { SEARCH_TYPE } from "../../models/search";
import useGetSearchResult from "../../hooks/useGetSearchResult";
import EmptySearchResult from "./EmptySearchResult";
import TopArea from "./TopArea";
import TopResult from "./TopResult";
import TopSongs from "./TopSongs";
import AlbumsBox from "./AlbumsBox";
import ArtistsBox from "./ArtistsBox";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const { data: playlist } = useGetSearchResult({
    q: keyword as string,
    type: [
      SEARCH_TYPE.Album,
      SEARCH_TYPE.Artist,
      SEARCH_TYPE.AudioBook,
      SEARCH_TYPE.Episode,
      SEARCH_TYPE.Playlist,
      SEARCH_TYPE.Show,
      SEARCH_TYPE.Track,
    ],
  });

  const typesToCheck = [
    "albums",
    "artists",
    "tracks",
    "playlists",
    "audiobooks",
    "episodes",
    "shows",
  ];
  const isEmptyResult =
    playlist &&
    typesToCheck.every((key) => (playlist as any)[key]?.total === 0);

  // Breakpoint 체크
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 4 },
        height: { xs: "auto", md: "100%" },
        overflowY: "auto",

        ...(isMdUp && {
          "&::-webkit-scrollbar": {
            width: "6px",
            display: "auto",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
        }),
      }}
    >
      {isEmptyResult ? (
        <EmptySearchResult />
      ) : isMdUp ? (
        <>
          <Box mb={4}>
            <TopArea tracks={playlist?.tracks} />
          </Box>
          <Box mb={4}>
            <AlbumsBox albums={playlist?.albums} />
          </Box>
          <Box mb={4}>
            <ArtistsBox artists={playlist?.artists} />
          </Box>
        </>
      ) : (
        <>
          <Box mb={3}>
            <TopResult item={playlist?.tracks?.items?.[0]} />
          </Box>
          <Box mb={3}>
            <TopSongs items={playlist?.tracks?.items} />
          </Box>
          <Box mb={3}>
            <ArtistsBox artists={playlist?.artists} />
          </Box>
          <Box mb={3}>
            <AlbumsBox albums={playlist?.albums} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default SearchWithKeywordPage;
