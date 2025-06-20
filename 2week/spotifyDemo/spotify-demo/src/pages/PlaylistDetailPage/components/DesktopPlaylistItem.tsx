import { styled, TableCell, TableRow } from "@mui/material";
import { PlaylistTrack } from "../../../models/playlist";
import { Episode, Track } from "../../../models/track";
import { convertPlayListItem } from "../../../utils/calculate";

interface PlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const NoBorderCell = styled(TableCell)(() => ({
  borderBottom: "none",
}));

const HoverRow = styled(TableRow)(() => ({
  borderBottom: "none",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    cursor: "pointer",
    color: "#1db954",
  },
}));

const DesktopPlaylistItem = ({ item, index }: PlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  const copyItem = convertPlayListItem(item);
  return (
    <HoverRow>
      <NoBorderCell>{index}</NoBorderCell>
      <NoBorderCell>{item.track.name || "no name"}</NoBorderCell>
      <NoBorderCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </NoBorderCell>
      <NoBorderCell>{copyItem.added_at || "Unknown Date"}</NoBorderCell>
      <NoBorderCell>{copyItem.track.duration || "Unknown"}</NoBorderCell>
    </HoverRow>
  );
};

export default DesktopPlaylistItem;
