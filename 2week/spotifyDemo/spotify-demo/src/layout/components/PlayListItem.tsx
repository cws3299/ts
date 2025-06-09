import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

interface PlayListItem {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
}

const PlayListItemContainer = styled(ListItemButton)(() => ({
  padding: "8px",
  alignItems: "center",
  borderRadius: "8px",
}));
const PlaylistAvatar = styled(Avatar)({
  width: "48px",
  height: "48px",
  borderRadius: "8px",
});
const PlaylistName = styled(Typography)({
  fontWeight: "bold",
  color: "#1db954",
});

const PlayListItem = ({ name, image, artistName }: PlayListItem) => {
  return (
    <PlayListItemContainer>
      <ListItemAvatar>
        {image ? <PlaylistAvatar src={image} alt={name} /> : "No image"}
      </ListItemAvatar>
      <ListItemText
        primary={<PlaylistName>{name}</PlaylistName>}
        secondary={<Typography color="text.primary">{artistName}</Typography>}
      />
    </PlayListItemContainer>
  );
};

export default PlayListItem;
