import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { SEARCH_TYPE } from "../../models/search";
import useGetSearchResult from "../../hooks/useGetSearchResult";
import EmptySearchResult from "./EmptySearchResult";
import TopArea from "./TopArea";
import AlbumsBox from "./AlbumsBox";
import ArtistBox from "./ArtistsBox";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

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

  console.log(playlist?.artists);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        padding: "16px",
        minHeight: 0,
      }}
    >
      {isEmptyResult ? (
        <EmptySearchResult />
      ) : (
        <>
          <Box sx={{ flex: 4, minHeight: 0 }}>
            <TopArea tracks={playlist?.tracks} />
          </Box>
          <Box sx={{ flex: 3, minHeight: 0 }}>
            <AlbumsBox albums={playlist?.albums} />
          </Box>
          <Box sx={{ flex: 3, minHeight: 0 }}>
            <ArtistBox artists={playlist?.artists} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default SearchWithKeywordPage;
