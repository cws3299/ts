import { Avatar, Box, styled, Typography } from "@mui/material";
import { PlaylistTrack } from "../../../models/playlist";
import { Episode, Track } from "../../../models/track";

interface PlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const MobilePlaylistItem = ({ item, index }: PlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Avatar
        src={
          !isEpisode(item.track) ? item.track?.album?.images[0].url : "no image"
        }
        variant="square"
        sx={{ width: 48, height: 48, marginRight: 2, borderRadius: "30%" }}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" color="#1db954">
          {!isEpisode(item.track) ? item.track?.artists?.[0].name : "no name"}
        </Typography>
        <Typography variant="body2" color="white">
          {item.track?.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobilePlaylistItem;
