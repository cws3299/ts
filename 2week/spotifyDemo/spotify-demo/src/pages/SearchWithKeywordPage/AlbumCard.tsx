import { Box, styled, Tooltip, Typography } from "@mui/material";
import { SimplifiedAlbum } from "../../models/album";

interface AlbumCardProps {
  album?: SimplifiedAlbum;
}

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  width: "100%",
  objectFit: "cover",
  /* 모바일에선 80×80, SM 이상에선 100×100 */
  [theme.breakpoints.down("sm")]: {
    maxWidth: "80px",
    height: "80px",
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "100px",
    height: "100px",
  },
}));

const TruncatedText = styled(Typography)({
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const AlbumCard = ({ album }: AlbumCardProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "row", sm: "column" },
      alignItems: { xs: "center", sm: "flex-start" },
      width: { xs: "100%", sm: "100px" },
      mb: { xs: 2, sm: 0 },
      flexShrink: 0,
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.04)",
        color: "#1DB954",
      },
    }}
  >
    {album?.images?.[0]?.url && (
      <AlbumImage src={album.images[0].url} alt={album.name ?? "album cover"} />
    )}
    <Box
      sx={{
        ml: { xs: 2, sm: 0 },
        mt: { xs: 0, sm: 2 },
        flex: 1,
      }}
    >
      <Tooltip
        title={album?.name && album.name.length > 20 ? album.name : ""}
        arrow
      >
        <TruncatedText
          fontWeight="bold"
          fontSize={{ xs: "0.9rem", sm: "0.875rem" }}
        >
          {album?.name}
        </TruncatedText>
      </Tooltip>
      <Typography
        variant="body2"
        color="text.secondary"
        fontSize={{ xs: "0.8rem", sm: "0.875rem" }}
      >
        {album?.artists?.[0]?.name}
      </Typography>
    </Box>
  </Box>
);

export default AlbumCard;
