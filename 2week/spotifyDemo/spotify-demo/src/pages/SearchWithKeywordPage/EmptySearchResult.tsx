import { Box, Button, Card, styled, Typography } from "@mui/material";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const EmptySearchResult = () => {
  return (
    <EmptyPlaylistCard
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flex: 1,
      }}
    >
      <Typography variant="h2" fontWeight={700}>
        검색 결과가 없습니다
      </Typography>
    </EmptyPlaylistCard>
  );
};

export default EmptySearchResult;
