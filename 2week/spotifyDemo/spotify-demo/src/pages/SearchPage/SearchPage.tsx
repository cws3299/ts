import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import useGetSearchCategories from "../../hooks/useGetSearchCategories";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../common/components/loadingSpinner";

const bgColors = [
  "#E13300",
  "#1DB954",
  "#535353",
  "#8D67AB",
  "#E8115B",
  "#158A08",
  "#27856A",
  "#1E3264",
  "#B49BC8",
  "#FF4632",
  "#E9C46A",
  "#2A9D8F",
  "#264653",
  "#F4A261",
  "#9C27B0",
];

const SearchPage = () => {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetSearchCategories();

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const categories =
    data?.pages.flatMap((page) => page.categories?.items ?? []) ?? [];

  const grouped = Array.from(
    { length: Math.ceil(categories.length / 3) },
    (_, i) => categories.slice(i * 3, i * 3 + 3)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        padding: "16px",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="white"
        sx={{ height: 40, mb: 2 }}
      >
        Browse All
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 10,
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
        }}
      >
        {grouped.map((row, rowIndex) => {
          const isLastRow = rowIndex === grouped.length - 1;
          return (
            <Box
              key={rowIndex}
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {row.map((category, idx) => {
                const bgColor =
                  bgColors[(rowIndex * 3 + idx) % bgColors.length];

                return (
                  <Box
                    key={category.id}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      height: 160,
                      backgroundColor: bgColor,
                      color: "white",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: 2,
                      position: "relative",
                      overflow: "hidden",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.04)",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ zIndex: 1 }}
                    >
                      {category.name}
                    </Typography>
                    <Box
                      component="img"
                      src={category.icons?.[0]?.url ?? ""}
                      alt={category.name}
                      sx={{
                        width: 150,
                        height: 150,
                        position: "absolute",
                        bottom: -10,
                        right: -10,
                        opacity: 0.7,
                        transform: "rotate(25deg)",
                        zIndex: 0,
                      }}
                    />
                  </Box>
                );
              })}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, i) => (
                  <Box key={`empty-${i}`} sx={{ flex: 1 }} />
                ))}
              {isLastRow && <div ref={ref} style={{ height: 1 }} />}
            </Box>
          );
        })}
        {(isLoading || isFetchingNextPage) && <LoadingSpinner />}
      </Box>
    </Box>
  );
};

export default SearchPage;
