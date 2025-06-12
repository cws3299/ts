import { Box, Typography, Avatar, Button } from "@mui/material";
import { Track } from "../../../models/track";

interface SearchResultListProps {
  list: Track[];
}

const SearchResultList = ({ list }: SearchResultListProps) => {
  return (
    <Box>
      {list.map((track, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            paddingY: 1,
            borderBottom: "1px solid #333",
          }}
        >
          <Avatar
            src={track.album?.images?.[0]?.url}
            variant="square"
            sx={{ width: 48, height: 48, marginRight: 2 }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" color="white">
              {track.name}
            </Typography>
            <Typography variant="body2" color="gray">
              {track.artists?.map((artist) => artist.name).join(", ")}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="white">
              {track.album?.name}
            </Typography>
          </Box>

          <Button
            size="small"
            sx={{ color: "#1DB954", textTransform: "none", minWidth: 40 }}
          >
            Add
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default SearchResultList;
