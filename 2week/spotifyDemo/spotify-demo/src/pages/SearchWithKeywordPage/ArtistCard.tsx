import { Box, styled, Tooltip, Typography } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrow";
import { Artist } from "../../models/artist";

interface ArtistCardProps {
  artist?: Artist;
}

const ArtistImage = styled("img")(({ theme }) => ({
  borderRadius: "50%",
  width: "100%",
  objectFit: "cover",
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
  marginTop: "12px",
});

const ArtistCard = ({ artist }: ArtistCardProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "row", sm: "column" },
      alignItems: "center",
      width: { xs: "100%", sm: "100px" },
      mb: { xs: 2, sm: 0 },
      flexShrink: 0,
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.04)",
        color: "#1DB954",
      },
      "&:hover .overlay": {
        opacity: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
      },
    }}
  >
    <Box sx={{ position: "relative" }}>
      {artist?.images?.[0]?.url && (
        <ArtistImage src={artist.images[0].url} alt={artist.name} />
      )}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          borderRadius: "50%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1db954",
            width: { xs: 24, sm: 32 },
            height: { xs: 24, sm: 32 },
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PlayArrowRoundedIcon
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, color: "#fff" }}
          />
        </Box>
      </Box>
    </Box>

    <Box
      sx={{
        ml: { xs: 2, sm: 0 },
        mt: { xs: 0, sm: 2 },
        flex: 1,
        textAlign: { xs: "left", sm: "center" },
      }}
    >
      <Tooltip
        title={artist?.name && artist.name.length > 10 ? artist.name : ""}
        arrow
      >
        <TruncatedText
          fontWeight="bold"
          fontSize={{ xs: "0.9rem", sm: "0.875rem" }}
        >
          {artist?.name}
        </TruncatedText>
      </Tooltip>
      <Typography
        variant="body2"
        color="text.secondary"
        fontSize={{ xs: "0.8rem", sm: "0.875rem" }}
      >
        Artist
      </Typography>
    </Box>
  </Box>
);

export default ArtistCard;
