import { TextField, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../../common/components/loadingSpinner";

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        height: "100%",
        minWidth: 0,
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
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="white" mb={2}>
        Let's find something for your playlist
      </Typography>

      <Box
        sx={{
          backgroundColor: "#282828",
          borderRadius: "8px",
          paddingX: 2,
          display: "flex",
          alignItems: "center",
          height: 56,
          width: "100%",
          maxWidth: 600,
          marginBottom: 2,
          flexShrink: 0,
        }}
      >
        <SearchIcon sx={{ color: "#b3b3b3", marginRight: 1 }} />
        <TextField
          variant="standard"
          value={keyword}
          onChange={handleSearchKeyword}
          placeholder="Search for songs or episodes"
          fullWidth
          autoComplete="off"
          sx={{
            flex: 1,
            input: {
              color: "white",
              backgroundColor: "transparent",
              "&::placeholder": {
                color: "#b3b3b3",
                opacity: 1,
              },
              "&:focus": {
                outline: "none",
              },
            },
          }}
        />
      </Box>

      {data?.pages[0]?.tracks?.total === 0 ? (
        <Typography color="gray" mt={2}>
          No results found.
        </Typography>
      ) : (
        <>
          {data?.pages.map((page) => {
            if (!page.tracks) return null;
            return (
              <SearchResultList
                key={page.tracks.href}
                list={page.tracks.items}
              />
            );
          })}
        </>
      )}
      <div ref={ref} style={{ height: 1 }} />
      {isLoading && <LoadingSpinner />}
    </Box>
  );
};

export default EmptyPlaylistWithSearch;
