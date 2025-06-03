import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  justifyContent: "space-between",
});

const LibraryHead = () => {
  return (
    <Header>
      <Box display="flex" alignItems="center" flexGrow={1} gap="20px">
        <BookmarkIcon />
        <Typography variant="h2" fontWeight={700} width={"80%"}>
          Your Library
        </Typography>
      </Box>
      <Button>
        <AddIcon />
      </Button>
    </Header>
  );
};

export default LibraryHead;
