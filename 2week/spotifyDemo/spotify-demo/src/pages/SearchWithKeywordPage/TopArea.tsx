import { Box } from "@mui/material";
import TopResult from "./TopResult";
import TopSongs from "./TopSongs";
import { ApiResponse } from "../../models/apiResponse";
import { Track } from "../../models/track";

interface TopAreaProps {
  tracks?: ApiResponse<Track>;
}

const TopArea = ({ tracks }: TopAreaProps) => (
  <Box
    sx={{
      display: "flex",
      width: "100%",
      gap: 2,
      flexDirection: { xs: "column", sm: "row" },
    }}
  >
    <Box sx={{ width: { xs: "100%", sm: "40%" } }}>
      <TopResult item={tracks?.items?.[0]} />
    </Box>
    <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
      <TopSongs items={tracks?.items} />
    </Box>
  </Box>
);

export default TopArea;
