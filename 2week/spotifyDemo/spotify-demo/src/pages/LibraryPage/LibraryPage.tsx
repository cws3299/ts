import React from "react";
import Library from "../../layout/components/Library";
import { useMediaQuery, useTheme } from "@mui/material";

const LibraryPage = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return <div>{isMdUp ? null : <Library />}</div>;
};

export default LibraryPage;
