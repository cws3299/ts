import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import LoadingSpinner from "./common/components/loadingSpinner";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
  () => import("./pages/SearchWithKeywordPage/SearchWithKeywordPage")
);
const PlaylistDetailPage = React.lazy(
  () => import("./pages/PlaylistDetailPage/PlaylistDetailPage")
);
const LibraryPage = React.lazy(() => import("./pages/LibraryPage/LibraryPage"));

// Sidebar

// 1. Home                    -> /
// 2. Search                  -> /search
// 3. Search Result           -> /search/:keyword
// 4. PlayList Detail         -> /playlist/:id
// 5. (모바일 버전) PlayList    -> /playlist

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="playlist" element={<LibraryPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
