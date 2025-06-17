import { Box, Typography } from "@mui/material";
import { ApiResponse } from "../../models/apiResponse";
import { Artist } from "../../models/artist";
import ArtistCard from "./ArtistCard";

interface ArtistsBoxProps {
  artists?: ApiResponse<Artist>;
}

// ArtistBox랑 사실상 로직 거의 동일, TypoGraphy만 추가 props로 넘기고, 나머지는 공통 명칭으로 해도 될듯?
// 나중에 수정
const ArtistBox = ({ artists }: ArtistsBoxProps) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, gap: "20px" }}
    >
      <Typography variant="h6" fontWeight="bold">
        Artist
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: 1,
          "&::-webkit-scrollbar": {
            height: "6px",
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
        {artists?.items?.slice(0, 10).map((artist) => {
          return <ArtistCard key={artist.id} artist={artist} />;
        })}
      </Box>
    </Box>
  );
};

export default ArtistBox;
