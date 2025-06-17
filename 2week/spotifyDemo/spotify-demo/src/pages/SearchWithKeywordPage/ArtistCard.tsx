import { Box, styled, Tooltip, Typography } from "@mui/material";
import { Artist } from "../../models/artist";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrow";

interface TopResultProps {
  artist?: Artist;
}

const AlbumImage = styled("img")(() => ({
  borderRadius: "50%",
  width: "100%",
  maxWidth: "100px",
  height: "100px",
  objectFit: "cover",
  display: "block",
}));

const TruncatedText = styled(Typography)({
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  marginTop: "12px",
});

const ArtistCard = ({ artist }: TopResultProps) => {
  return (
    <Box
      sx={{
        position: "relative",
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
        "&:hover .overlay": {
          opacity: 1,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {artist?.images?.[0]?.url && (
          <AlbumImage
            src={artist?.images[0]?.url}
            alt={artist?.name ?? "artist cover"}
          />
        )}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            transition:
              "opacity 0.3s ease-in-out, background-color 0.3s ease-in-out",
            borderRadius: "50%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#1db954",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlayArrowRoundedIcon sx={{ color: "white" }} fontSize="small" />
          </Box>
        </Box>
      </Box>

      <Tooltip
        title={artist?.name && artist?.name?.length > 10 ? artist?.name : ""}
        arrow
      >
        <TruncatedText fontWeight="bold">{artist?.name}</TruncatedText>
      </Tooltip>
      <Typography variant="body2" color="text.secondary">
        Artist
      </Typography>
    </Box>
  );
};

export default ArtistCard;
