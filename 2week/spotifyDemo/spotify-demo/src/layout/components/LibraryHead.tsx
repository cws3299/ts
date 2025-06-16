import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlayList from "../../hooks/useCreatePlayList";
import { useAuthStore } from "../../state/AuthStore";
import { getSpotifyAuthUrl } from "../../utils/auth";

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  justifyContent: "space-between",
});

const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlayList();
  const userId = useAuthStore((state) => state.userId);

  const handleCreatePlayList = () => {
    if (!userId) {
      getSpotifyAuthUrl();
    }
    createPlaylist({ name: "테스트" });
  };

  return (
    <Header>
      <Box display="flex" alignItems="center" flexGrow={1} gap="20px">
        <BookmarkIcon />
        <Typography variant="h2" fontWeight={700} width={"80%"}>
          Your Library
        </Typography>
      </Box>
      <Button onClick={handleCreatePlayList}>
        <AddIcon />
      </Button>
    </Header>
  );
};

export default LibraryHead;
