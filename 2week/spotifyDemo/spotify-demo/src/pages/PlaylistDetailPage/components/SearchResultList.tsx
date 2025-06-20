import {
  Box,
  Typography,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Track } from "../../../models/track";
import { useParams } from "react-router";
import { useState } from "react";
import useItemToPlayList from "../../../hooks/useItemToPlayList";

interface SearchResultListProps {
  list: Track[];
}

const SearchResultList = ({ list }: SearchResultListProps) => {
  const { id } = useParams<{ id: string }>();
  const [uris, setUris] = useState<string[]>([]);

  const toggleUri = (uri: string) => {
    setUris((prev) =>
      prev.includes(uri) ? prev.filter((u) => u !== uri) : [...prev, uri]
    );
  };

  const { mutate: addItemToPlayList } = useItemToPlayList();

  const handleAddItemToPlayList = (id: string, uri: string) => {
    const newUris = uris.includes(uri) ? uris : [...uris, uri];

    addItemToPlayList({
      playlist_id: id,
      params: {
        uris: newUris,
        position: 0,
      },
    });
  };

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box>
      {list.map((track, index) => {
        const uri = track.uri;
        if (!uri) return null;

        const isSelected = uris.includes(uri);

        return (
          <Box
            key={uri ?? index}
            onClick={() => toggleUri(uri)}
            sx={{
              display: "flex",
              alignItems: "center",
              paddingY: 1,
              borderBottom: "1px solid #333",
              backgroundColor: isSelected ? "#1db95433" : "transparent",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
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

            {isMdUp ? (
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="white">
                  {track.album?.name}
                </Typography>
              </Box>
            ) : null}

            <Button
              size="small"
              sx={{ color: "#1DB954", textTransform: "none", minWidth: 40 }}
              onClick={(e) => {
                e.stopPropagation(); // 박스 클릭 방지
                handleAddItemToPlayList(id as string, uri);
              }}
            >
              Add
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

export default SearchResultList;
