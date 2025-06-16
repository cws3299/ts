import { Box } from "@mui/material";
import TopResult from "./TopResult";
import TopSongs from "./TopSongs";
import { ApiResponse } from "../../models/apiResponse";
import { Track } from "../../models/track";

interface TopAreaProps {
  tracks?: ApiResponse<Track>;
}

const TopArea = ({ tracks }: TopAreaProps) => {
  return (
    <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
      <Box sx={{ flex: 4 }}>
        <TopResult item={tracks?.items?.[0]} />
      </Box>
      <Box sx={{ flex: 6 }}>
        <TopSongs items={tracks?.items} />
      </Box>
    </Box>
  );
};

export default TopArea;
