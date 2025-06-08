import useGetCurrentUserPlayLists from "../../hooks/useGetCurrentUserPlayLists";
import EmptyPlaylist from "./EmptyPlaylist";

// 로그인 한 경우와 안한경우에 따라 표현할 요소가 다르며, 표현할 UI들을 조합하여 사용하기 때문에 Library분리
const Library = () => {
  const { data } = useGetCurrentUserPlayLists({ limit: 10, offset: 0 });
  console.log("여기", data);
  return <EmptyPlaylist />;
};

export default Library;

// LibraryWidget -> (1. LibraryHeader 2.Library)
// Library -> 유저 상태에 따라 emptyLibrary 혹은 LibraryList를 리턴시킴

// LibraryList가 리턴되는 경우 플레이리스트 목록을 react-query등으로 호출
// LibraryList에 플레이리스트 리스트 데이터를 map으로 각 플레이리스트를 표현하도록 변경 (LibraryList -> playListCard)

// 플레이 리스트 별로 ui및 기능이 다르지 않다는 가정하에 playListCard라는 공통 컴포넌트를 사용
// 플레이 리스트 별로 ui및 기능이 다를 경우, A,B(동일 기능) 플레이리스트 카드 표현하고 구분 이후 아래에 C,D(동일 기능) 플레이리스트 카드 표현
