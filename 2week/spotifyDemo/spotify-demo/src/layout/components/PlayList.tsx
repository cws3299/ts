import { SimplifiedPlaylist } from "../../models/playlist";
import PlayListItem from "./PlayListItem";

const PlayList = ({ playLists }: { playLists: SimplifiedPlaylist[] }) => {
  return (
    <div>
      {playLists.map((playlist) => (
        <PlayListItem
          name={playlist.name || ""}
          image={(playlist.images && playlist.images[0]?.url) || null}
          id={playlist.id || ""}
          key={playlist.id}
          artistName={"Playlist •" + playlist.owner?.display_name}
        />
      ))}
    </div>
  );
};

export default PlayList;
