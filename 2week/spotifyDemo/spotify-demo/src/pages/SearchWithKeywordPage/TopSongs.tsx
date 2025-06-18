import { Avatar, Box, Typography, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Track } from "../../models/track";
import { useInView } from "react-intersection-observer";
import useGetCurrentUserPlayLists from "../../hooks/useGetCurrentUserPlayLists";
import LoadingSpinner from "../../common/components/loadingSpinner";
import useItemToPlayList from "../../hooks/useItemToPlayList";
import { useToast } from "../../provider/ToastProvider";

interface TopResultProps {
  items?: Track[];
}

interface Position {
  top: number;
  left: number;
}

const contextMenuItems = ["Play", "Add to Playlist", "Go to Artist", "Share"];

const formatDuration = (ms?: number) => {
  if (!ms) return "";
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TopSongs = ({ items }: TopResultProps) => {
  const [menuPosition, setMenuPosition] = useState<Position | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { showToast } = useToast();
  // contextMenu 로직
  const handleContextMenu = (event: React.MouseEvent, track: Track) => {
    if (event.button !== 2) return; // 우클릭만 허용
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

  // 너무 컴포넌트가 크다 -> 나중에 contextMenu만 따로 컴포넌트화 하는게 나을 듯
  // 컨텍스트 메뉴에 플레이리스트 이름 목록 표현
  const { ref, inView } = useInView();
  const {
    data: playlist,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlayLists({
    limit: 10,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // 컨텍스트메뉴에서 선택된 노래 플리에 저장
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
          onContextMenu={(e) => handleContextMenu(e, track)}
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
