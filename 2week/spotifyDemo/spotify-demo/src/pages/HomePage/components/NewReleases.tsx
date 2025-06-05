import { Typography } from "@mui/material";
import { ClientId } from "../../../config/authConfig";

const NewReleases = () => {
  console.log(ClientId);
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
    </div>
  );
};

export default NewReleases;
