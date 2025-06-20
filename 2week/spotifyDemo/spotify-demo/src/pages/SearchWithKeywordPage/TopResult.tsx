import { Box, styled, Typography } from "@mui/material";
import { Track } from "../../models/track";

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  width: "100%",
  height: "auto",
  [theme.breakpoints.up("sm")]: { maxWidth: "160px" },
  [theme.breakpoints.down("sm")]: { maxWidth: "120px" },
}));

interface TopResultProps {
  item?: Track;
}

const TopResult = ({ item }: TopResultProps) => (
  <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <Typography variant="h6" fontWeight="bold" mb={1}>
      Top Result
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {item?.album?.images?.[0]?.url && (
        <AlbumImage
          src={item.album.images[0].url}
          alt={item.name ?? "album cover"}
        />
      )}
      <Typography
        variant="h6"
        fontWeight="bold"
        mt={2}
        fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
      >
        {item?.name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontSize={{ xs: "0.875rem", sm: "1rem" }}
      >
        Song • {item?.artists?.[0]?.name}
      </Typography>
    </Box>
  </Box>
);

export default TopResult;
