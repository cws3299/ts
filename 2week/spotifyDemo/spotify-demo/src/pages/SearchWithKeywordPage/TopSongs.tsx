import { Avatar, Box, Typography, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Track } from "../../models/track";
import { useInView } from "react-intersection-observer";
import useGetCurrentUserPlayLists from "../../hooks/useGetCurrentUserPlayLists";
import LoadingSpinner from "../../common/components/loadingSpinner";
import useItemToPlayList from "../../hooks/useItemToPlayList";
import { useToast } from "../../provider/ToastProvider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface TopResultProps {
  items?: Track[];
}

interface Position {
  top: number;
  left: number;
}

const TopSongs = ({ items }: TopResultProps) => {
  const [menuPosition, setMenuPosition] = useState<Position | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { showToast } = useToast();

  const handleContextMenu = (
    event: React.MouseEvent,
    track: Track,
    fromPlus: boolean
  ) => {
    if (event.button !== 2 && !fromPlus) return; // 우클릭만 허용
    event.preventDefault();
    setSelectedTrack(track);
    setMenuPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  const handleClose = () => {
    setMenuPosition(null);
    setSelectedTrack(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { ref, inView } = useInView();
  const {
    data: playlist,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlayLists({ limit: 10 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const { mutate: addItemToPlayList } = useItemToPlayList();

  const handleAddItemToPlayList = (id: string, uri: string) => {
    addItemToPlayList({
      playlist_id: id,
      params: {
        uris: [uri],
        position: 0,
      },
    });
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return "";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Top Songs
      </Typography>

      {items?.slice(0, 4).map((track) => (
        <Box
          key={track.id}
          onContextMenu={(e) => handleContextMenu(e, track, false)}
          onMouseEnter={() => setHoveredTrackId(track.id as string)}
          onMouseLeave={() => setHoveredTrackId(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              cursor: "pointer",
              color: "#1db954",
            },
          }}
        >
          {/* 60%: 썸네일 + 정보 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 6 }}>
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

          {/* 20%: Add 버튼 */}
          <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
            <AddCircleOutlineIcon
              fontSize="medium"
              onClick={(e) => handleContextMenu(e, track, true)}
              sx={{ cursor: "pointer" }}
            />
          </Box>

          {/* 20%: duration */}
          <Box
            sx={{
              flex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {formatDuration(track.duration_ms)}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Context Menu */}
      {menuPosition && (
        <Paper
          ref={menuRef}
          elevation={3}
          sx={{
            position: "fixed",
            top: menuPosition.top,
            left: menuPosition.left,
            minWidth: 160,
            maxHeight: 200,
            overflowY: "auto",
            backgroundColor: "#282828",
            color: "#fff",
            borderRadius: 1,
            zIndex: 9999,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#a0a0a0",
            },
          }}
        >
          {playlist?.pages.map((page, pageIndex) =>
            page.items.map((item, itemIndex) => (
              <Box
                key={item.id}
                onMouseEnter={() => setHoveredIndex(pageIndex * 10 + itemIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddItemToPlayList(
                    item.id as string,
                    selectedTrack?.uri as string
                  );
                  showToast("플레이리스트에 저장되었습니다.");
                  handleClose();
                }}
                sx={{
                  px: 2,
                  py: 1,
                  cursor: "pointer",
                  backgroundColor:
                    hoveredIndex === pageIndex * 10 + itemIndex
                      ? "#1db954"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "#1db954",
                  },
                }}
              >
                {item.name}
              </Box>
            ))
          )}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </Paper>
      )}
    </Box>
  );
};

export default TopSongs;
