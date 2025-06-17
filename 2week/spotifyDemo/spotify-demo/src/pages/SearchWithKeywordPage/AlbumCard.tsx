import { Box, styled, Tooltip, Typography } from "@mui/material";
import { SimplifiedAlbum } from "../../models/album";

interface TopResultProps {
  album?: SimplifiedAlbum;
}

const AlbumImage = styled("img")(() => ({
  borderRadius: "8px",
  width: "100%",
  maxWidth: "100px",
  height: "100px",
  objectFit: "cover",
}));

const TruncatedText = styled(Typography)({
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const AlbumCard = ({ album }: TopResultProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: "200px",
        height: "200px",
        minWidth: "100px",
        width: "100px",
        flexShrink: 0,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.04)",
          color: "#1DB954",
        },
      }}
    >
      {album?.images?.[0]?.url && (
        <AlbumImage
          src={album?.images[0]?.url}
          alt={album?.name ?? "album cover"}
        />
      )}
      <Tooltip
        title={album?.name && album?.name?.length > 20 ? album?.name : ""}
        arrow
      >
        <TruncatedText fontWeight="bold" mt={2}>
          {album?.name}
        </TruncatedText>
      </Tooltip>
      <Typography variant="body2" color="text.secondary">
        {album?.artists?.[0]?.name}
      </Typography>
    </Box>
  );
};

export default AlbumCard;
