import { Box, Button, Card, styled, Typography } from "@mui/material";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const EmptyPlaylist = () => {
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          style={{
            fontWeight: "700",
            width: "80%",
          }}
        >
          Create playlist
        </Button>
      </Box>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;
