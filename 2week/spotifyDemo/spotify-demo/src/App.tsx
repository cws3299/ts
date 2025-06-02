import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";

// Sidebar

// 1. Home                    -> /
// 2. Search                  -> /search
// 3. Search Result           -> /search/:keyword
// 4. PlayList Detail         -> /playlist/:id
// 5. (모바일 버전) PlayList    -> /playlist

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        {/* <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
        <Route path="playlist/:id" element={<PlaylistDetailPage />} />
        <Route path="playlist" element={<LibraryPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
