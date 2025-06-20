import React, { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
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

  const theme = useTheme();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px 0px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const categories =
    data?.pages.flatMap((page) => page.categories?.items ?? []) ?? [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        height: "100%",
        padding: "16px",
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="white" sx={{ mb: 2 }}>
        Browse All
      </Typography>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: 2,
          overflowX: "hidden",
          maxWidth: "100%",
          "&::-webkit-scrollbar": {
            width: "6px",
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
        {categories.map((category, index) => {
          const bgColor = bgColors[index % bgColors.length];

          return (
            <Box
              key={category.id}
              sx={{
                backgroundColor: bgColor,
                borderRadius: "8px",
                color: "white",
                padding: 2,
                height: 160,
                flex: "1 1 90%",
                maxWidth: "400px",
                minWidth: 0,

                [theme.breakpoints.up("sm")]: {
                  flex: "1 1 calc(50% - 16px)",
                },
                [theme.breakpoints.up("md")]: {
                  flex: "1 1 calc(33% - 16px)",
                },

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

        {hasNextPage && (
          <Box
            ref={ref}
            sx={{
              height: { xs: 200, sm: 64 },
              width: "100%",
              flexShrink: 0,
            }}
          />
        )}

        {(isLoading || isFetchingNextPage) && <LoadingSpinner />}
      </Box>
    </Box>
  );
};

export default SearchPage;
