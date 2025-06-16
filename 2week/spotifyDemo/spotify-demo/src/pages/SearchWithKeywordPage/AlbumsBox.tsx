import { Box, Typography } from "@mui/material";
import { ApiResponse } from "../../models/apiResponse";
import { SimplifiedAlbum } from "../../models/album";
import AlbumCard from "./AlbumCard";

interface AlbumsBoxProps {
  albums?: ApiResponse<SimplifiedAlbum>;
}

const AlbumsBox = ({ albums }: AlbumsBoxProps) => {
  return (
    <Box>
      <Typography></Typography>
      <Box>
        {albums?.items?.map((album) => {
          return <AlbumCard key={album.id} album={album} />;
        })}
      </Box>
    </Box>
  );
};

export default AlbumsBox;
