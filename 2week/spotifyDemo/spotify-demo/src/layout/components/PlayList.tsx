import { useNavigate } from "react-router";
import { SimplifiedPlaylist } from "../../models/playlist";
import PlayListItem from "./PlayListItem";
import { useState } from "react";

const PlayList = ({ playLists }: { playLists: SimplifiedPlaylist[] }) => {
  const [selectedPlayList, setSelectedPlayList] = useState<string>("");
  const navigate = useNavigate();
  const handleItemClick = (id: string) => {
    setSelectedPlayList(id);
    navigate(`/playlist/${id}`);
  };
  return (
    <div>
      {playLists.map((playlist) => (
        <PlayListItem
          selected={selectedPlayList === playlist.id}
          handleClick={handleItemClick}
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
