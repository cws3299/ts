import { Box, styled, Typography } from "@mui/material";
import { Track } from "../../models/track";

const AlbumImage = styled("img")(() => ({
  borderRadius: "8px",
  width: "100%",
  maxWidth: "160px",
  height: "auto",
}));

interface TopResultProps {
  item?: Track;
}

const TopResult = ({ item }: TopResultProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Top Result
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {item?.album?.images?.[0]?.url && (
          <AlbumImage
            src={item.album.images[0].url}
            alt={item.name ?? "album cover"}
          />
        )}
        <Typography variant="h6" fontWeight="bold" mt={2}>
          {item?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Song • {item?.artists?.[0]?.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default TopResult;
