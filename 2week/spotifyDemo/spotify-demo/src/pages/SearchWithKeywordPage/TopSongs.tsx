import { Avatar, Box, Typography } from "@mui/material";
import { Track } from "../../models/track";

interface TopResultProps {
  items?: Track[];
}

const formatDuration = (ms?: number) => {
  if (!ms) return "";
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TopSongs = ({ items }: TopResultProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Top Songs
      </Typography>
      {items?.slice(0, 5).map((track) => (
        <Box
          key={track.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            padding: "8px",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              cursor: "pointer",
              color: "#1db954",
            },
          }}
        >
          {/* 왼쪽: 썸네일, 제목, 아티스트 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={track.album?.images?.[2]?.url}
              alt={track.name}
              sx={{ width: 40, height: 40 }}
            />
            <Box>
              <Typography variant="body1">{track.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {track.artists?.[0]?.name}
              </Typography>
            </Box>
          </Box>

          {/* 오른쪽: duration */}
          <Typography variant="body2" color="text.secondary">
            {formatDuration(track.duration_ms)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TopSongs;
