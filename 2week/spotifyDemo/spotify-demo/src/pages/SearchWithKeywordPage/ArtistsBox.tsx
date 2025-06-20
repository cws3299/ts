import { Box, Typography } from "@mui/material";
import { ApiResponse } from "../../models/apiResponse";
import { Artist } from "../../models/artist";
import ArtistCard from "./ArtistCard";

interface ArtistBoxProps {
  artists?: ApiResponse<Artist>;
}

const ArtistBox = ({ artists }: ArtistBoxProps) => (
  <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
    <Typography
      variant="h6"
      fontWeight="bold"
      mb={1}
      fontSize={{ xs: "1rem", sm: "1.25rem" }}
    >
      Artist
    </Typography>

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        overflowX: { xs: "visible", sm: "auto" },
        gap: { xs: 1, sm: 2 },
        pb: 1,
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(255,255,255,0.5)",
        },
      }}
    >
      {artists?.items?.slice(0, 10).map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </Box>
  </Box>
);

export default ArtistBox;
