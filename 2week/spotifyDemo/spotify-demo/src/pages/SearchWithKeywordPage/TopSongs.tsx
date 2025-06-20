// src/pages/search/TopSongs.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Popover,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useInView } from "react-intersection-observer";
import useGetCurrentUserPlayLists from "../../hooks/useGetCurrentUserPlayLists";
import LoadingSpinner from "../../common/components/loadingSpinner";
import useItemToPlayList from "../../hooks/useItemToPlayList";
import { useToast } from "../../provider/ToastProvider";
import { useAuthStore } from "../../state/AuthStore";
import { Track } from "../../models/track";

interface TopSongsProps {
  items?: Track[];
}

interface Position {
  top: number;
  left: number;
}

const TopSongs: React.FC<TopSongsProps> = ({ items }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // 컨텍스트 메뉴 상태
  const [menuPosition, setMenuPosition] = useState<Position | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  // 로그인 & 토스트
  const { showToast } = useToast();
  const userId = useAuthStore((s) => s.userId);

  // 플레이리스트 + 무한 스크롤
  const {
    data: playlists,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlayLists({ limit: 10 });
  const { ref: loadMoreRef, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 곡 추가 뮤테이션
  const { mutate: addItemToPlayList } = useItemToPlayList();

  // 우클릭 or + 클릭 → 메뉴 열기
  const handleContextMenu = (
    e: React.MouseEvent,
    track: Track,
    fromPlus: boolean
  ) => {
    if (!userId) {
      showToast("로그인이 필요합니다.");
      return;
    }
    if (e.button !== 2 && !fromPlus) return;
    e.preventDefault();
    setSelectedTrack(track);
    setMenuPosition({ top: e.clientY, left: e.clientX });
  };

  // 메뉴 닫기
  const handleCloseMenu = () => {
    setMenuPosition(null);
    setSelectedTrack(null);
  };

  // 메뉴 외부 클릭 감지
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClickOutside = (ev: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(ev.target as Node)) {
        handleCloseMenu();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // 재생 시간 포맷터
  const formatDuration = (ms?: number) => {
    if (!ms) return "";
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      {/* 모바일 레이아웃 */}
      {!isMdUp && (
        <>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Songs
          </Typography>
          <Paper
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              mb: 3,
            }}
          >
            {items?.slice(0, 4).map((track, idx) => (
              <SongRow
                key={track.id}
                track={track}
                onContextMenu={handleContextMenu}
                formatDuration={formatDuration}
                isDesktop={false}
              />
            ))}
            <div ref={loadMoreRef}>
              {isFetchingNextPage && <LoadingSpinner />}
            </div>
          </Paper>
        </>
      )}

      {/* 데스크탑 레이아웃 */}
      {isMdUp && (
        <>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Top Songs
          </Typography>
          {items?.slice(0, 4).map((track, idx) => (
            <SongRow
              key={track.id}
              track={track}
              onContextMenu={handleContextMenu}
              formatDuration={formatDuration}
              isDesktop={true}
            />
          ))}
          <div ref={loadMoreRef}>
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        </>
      )}

      {/* Popover 컨텍스트 메뉴 */}
      <Popover
        open={!!menuPosition}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition ?? undefined}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          ref: menuRef,
          elevation: 3,
          sx: {
            minWidth: 160,
            maxHeight: 200,
            overflowY: "auto",
            bgcolor: "#282828",
            color: "#fff",
            borderRadius: 1,
            "&::-webkit-scrollbar": { display: "none" },
          },
        }}
      >
        {playlists?.pages.map((page, pi) =>
          page.items.map((pl, ii) => (
            <Box
              key={pl.id}
              onClick={(e) => {
                e.stopPropagation();
                addItemToPlayList({
                  playlist_id: pl.id as string,
                  params: { uris: [selectedTrack?.uri!], position: 0 },
                });
                showToast("플레이리스트에 저장되었습니다.");
                handleCloseMenu();
              }}
              sx={{
                px: 2,
                py: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#1db954" },
              }}
            >
              {pl.name}
            </Box>
          ))
        )}
      </Popover>
    </>
  );
};

interface SongRowProps {
  track: Track;
  onContextMenu: (e: React.MouseEvent, track: Track, fromPlus: boolean) => void;
  formatDuration: (ms?: number) => string;
  isDesktop: boolean;
}

const SongRow: React.FC<SongRowProps> = ({
  track,
  onContextMenu,
  formatDuration,
  isDesktop,
}) => (
  <Box
    onContextMenu={(e) => onContextMenu(e, track, false)}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      p: isDesktop ? 1 : 0.5,
      mb: isDesktop ? 1 : 2,
      borderRadius: 1,
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.08)",
        cursor: "pointer",
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        src={track.album?.images?.[2]?.url}
        sx={{ width: isDesktop ? 40 : 32, height: isDesktop ? 40 : 32 }}
      />
      <Box>
        <Typography fontSize={isDesktop ? "1rem" : "0.9rem"}>
          {track.name}
        </Typography>
        <Typography
          color="text.secondary"
          fontSize={isDesktop ? "0.875rem" : "0.75rem"}
        >
          {track.artists?.[0]?.name}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <AddCircleOutlineIcon
        onClick={(e) => onContextMenu(e, track, true)}
        sx={{ cursor: "pointer" }}
      />
      <Typography
        color="text.secondary"
        fontSize={isDesktop ? "0.875rem" : "0.75rem"}
      >
        {formatDuration(track.duration_ms)}
      </Typography>
    </Box>
  </Box>
);

export default TopSongs;
