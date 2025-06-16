import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { SEARCH_TYPE } from "../../models/search";
import useGetSearchResult from "../../hooks/useGetSearchResult";
import EmptySearchResult from "./EmptySearchResult";
import TopArea from "./TopArea";
import AlbumsBox from "./AlbumsBox";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  console.log(keyword);

  const {
    data: playlist,
    error: playlistError,
    isLoading: isPlaylistLoading,
  } = useGetSearchResult({
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

  console.log("playlist?.tracks", playlist?.tracks);
  console.log("playlist?.albums", playlist?.albums);
  console.log("playlist?.artists", playlist?.artists);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        padding: "16px",
      }}
    >
      {isEmptyResult ? (
        <EmptySearchResult />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "8px",
          }}
        >
          <TopArea tracks={playlist?.tracks} />
          <AlbumsBox albums={playlist?.albums}></AlbumsBox>
          <Box sx={{ height: "30%" }}>가</Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchWithKeywordPage;
