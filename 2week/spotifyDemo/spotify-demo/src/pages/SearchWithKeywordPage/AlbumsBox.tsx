import { Box, Typography } from "@mui/material";
import { ApiResponse } from "../../models/apiResponse";
import { SimplifiedAlbum } from "../../models/album";
import AlbumCard from "./AlbumCard";

interface AlbumsBoxProps {
  albums?: ApiResponse<SimplifiedAlbum>;
}

// ArtistBox랑 사실상 로직 거의 동일, TypoGraphy만 추가 props로 넘기고, 나머지는 공통 명칭으로 해도 될듯?
// 나중에 수정
const AlbumsBox = ({ albums }: AlbumsBoxProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Typography variant="h6" fontWeight="bold">
        Albums
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
        {albums?.items?.slice(0, 10).map((album) => {
          return <AlbumCard key={album.id} album={album} />;
        })}
      </Box>
    </Box>
  );
};

export default AlbumsBox;
