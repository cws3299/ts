import { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import {
  useTheme,
  useMediaQuery,
  Box,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  styled,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useInView } from "react-intersection-observer";

import useGetPlayList from "../../hooks/useGetPlayList";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import { useAuthStore } from "../../state/AuthStore";
import UnauthorizedPage from "../../layout/components/UnAuthorizedPage";
import LoadingSpinner from "../../common/components/loadingSpinner";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import DefaultImage from "../../common/components/DefaultImage";
import { PAGE_LIMIT } from "../../config/commonConfig";
import MobilePlaylistItem from "./components/MobilePlaylistitem";

const HEADER_HEIGHT = 280;

const PlaylistHeader = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  background: "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: theme.spacing(2),
  maxHeight: `${HEADER_HEIGHT}px`,
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    maxHeight: "none",
  },
}));

const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  maxHeight: 240,
  width: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    maxHeight: "none",
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "3rem",
    textAlign: "left",
  },
}));

const PlayListInfo = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
}));

const BackgroundDiv = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
}));

const TableBodyContainer = styled("div")(() => ({
  flex: 1,
  overflowY: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "#999 transparent",
  display: "flex",
  flexDirection: "column",
  gap: 6,
  "&::-webkit-scrollbar": {
    width: "6px",
    display: "auto",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
}));

export default function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = useAuthStore((s) => s.userId);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlayList({ playlist_id: id as string });

  const {
    data: playlistItems,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({
    playlist_id: id as string,
    limit: PAGE_LIMIT,
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!userId) return <UnauthorizedPage />;
  if (!id) return <Navigate to="/" replace />;

  if (isPlaylistLoading || !playlist) return <LoadingSpinner />;
  if (playlistError)
    return <Typography color="error">{playlistError.message}</Typography>;

  return (
    <BackgroundDiv>
      <PlaylistHeader container spacing={7}>
        <ImageGrid>
          {playlist.images?.[0]?.url ? (
            <AlbumImage src={playlist.images[0].url} alt="cover" />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <PlayListInfo>
          <Box>
            <ResponsiveTypography variant="h1">
              {playlist.name}
            </ResponsiveTypography>
            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20"
                alt="owner"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist.owner?.display_name || "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white" ml={1}>
                • {playlist.tracks.total} songs
              </Typography>
            </Box>
          </Box>
        </PlayListInfo>
      </PlaylistHeader>

      {playlist.tracks.total === 0 ? (
        <EmptyPlaylistWithSearch />
      ) : !isMdUp ? (
        <TableBodyContainer>
          {playlistItems?.pages.map((page, pageIndex) =>
            page.items.map((item, itemIndex) => (
              <MobilePlaylistItem
                key={`${pageIndex}-${itemIndex}`}
                item={item}
                index={pageIndex * PAGE_LIMIT + itemIndex + 1}
              />
            ))
          )}
          <div>
            <div ref={ref} style={{ height: 1 }} />
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        </TableBodyContainer>
      ) : (
        <>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>앨범</TableCell>
                <TableCell>추가 일자</TableCell>
                <TableCell>재생 시간</TableCell>
              </TableRow>
            </TableHead>
          </Table>

          <TableBodyContainer>
            <Table>
              <tbody>
                {playlistItems?.pages.map((page, pageIndex) =>
                  page.items.map((item, itemIndex) => (
                    <DesktopPlaylistItem
                      key={`${pageIndex}-${itemIndex}`}
                      item={item}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  ))
                )}
                <tr>
                  <td colSpan={5}>
                    <div ref={ref} style={{ height: 1 }} />
                    {isFetchingNextPage && <LoadingSpinner />}
                  </td>
                </tr>
              </tbody>
            </Table>
          </TableBodyContainer>
        </>
      )}
    </BackgroundDiv>
  );
}
