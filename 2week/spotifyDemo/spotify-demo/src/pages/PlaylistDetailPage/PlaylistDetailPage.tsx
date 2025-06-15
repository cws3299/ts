import { Navigate, useParams } from "react-router";
import useGetPlayList from "../../hooks/useGetPlayList";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
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
import DefaultImage from "../../common/components/DefaultImage";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../config/commonConfig";
import { useEffect } from "react";
import LoadingSpinner from "../../common/components/loadingSpinner";
import { useInView } from "react-intersection-observer";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import { useAuthStore } from "../../state/AuthStore";
import UnauthorizedPage from "../../layout/components/UnAuthorizedPage";

const HEADER_HEIGHT = 280;

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "stretch",
  background: "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
  maxHeight: `${HEADER_HEIGHT}px`,
  overflow: "hidden",
});

const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const AlbumImage = styled("img")(() => ({
  borderRadius: "8px",
  height: "100%",
  maxHeight: "240px",
  width: "auto",
}));

const ResponsiveTypography = styled(Typography)(() => ({
  fontSize: "3rem",
  textAlign: "left",
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

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = useAuthStore((state) => state.userId);

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlayList({ playlist_id: id as string });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({
    playlist_id: id as string,
    limit: PAGE_LIMIT,
    offset: 0,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!userId) {
    return <UnauthorizedPage />;
  }

  if (id === undefined) {
    return <Navigate to="/" />;
  }

  return (
    <BackgroundDiv>
      <PlaylistHeader container spacing={7}>
        <ImageGrid>
          {playlist?.images ? (
            <AlbumImage
              src={playlist?.images[0].url}
              alt="playlist_cover.jpg"
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <PlayListInfo>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>
            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
                alt="owner"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist?.owner?.display_name || "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </PlayListInfo>
      </PlaylistHeader>

      {playlist?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch />
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
                      item={item}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                      key={`${pageIndex}-${itemIndex}`}
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
};

export default PlaylistDetailPage;
