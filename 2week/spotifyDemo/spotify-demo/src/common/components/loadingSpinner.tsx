import { Box } from "@mui/material";
import { MoonLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MoonLoader color="#1db954" />
    </Box>
  );
};

export default LoadingSpinner;
