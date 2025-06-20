import { styled } from "@mui/material";
import ErroeMessage from "../../common/components/ErrorMessage";
import LoadingSpinner from "../../common/components/loadingSpinner";
import useGetCurrentUserPlayLists from "../../hooks/useGetCurrentUserPlayLists";
import EmptyPlaylist from "./EmptyPlaylist";
import PlayList from "./PlayList";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  // maxHeight: "calc(100vh - 240px)",
  height: "100%",
  paddingRight: 8,

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

  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 180px)",
  },
}));

const Library = () => {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlayLists({
    limit: 10,
  });

  const { data: user } = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!user) return <EmptyPlaylist />;
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErroeMessage errorMessage={error.message} />;
  }

  return (
    <>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <PlayList playLists={page.items} key={index} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </PlaylistContainer>
      )}
    </>
  );
};

export default Library;

// LibraryWidget -> (1. LibraryHeader 2.Library)
// Library -> 유저 상태에 따라 emptyLibrary 혹은 LibraryList를 리턴시킴

// LibraryList가 리턴되는 경우 플레이리스트 목록을 react-query등으로 호출
// LibraryList에 플레이리스트 리스트 데이터를 map으로 각 플레이리스트를 표현하도록 변경 (LibraryList -> playListCard)

// 플레이 리스트 별로 ui및 기능이 다르지 않다는 가정하에 playListCard라는 공통 컴포넌트를 사용
// 플레이 리스트 별로 ui및 기능이 다를 경우, A,B(동일 기능) 플레이리스트 카드 표현하고 구분 이후 아래에 C,D(동일 기능) 플레이리스트 카드 표현
