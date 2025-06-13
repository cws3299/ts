import { Button, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { getSpotifyAuthUrl } from "../../utils/auth";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#000"
    >
      <Stack spacing={2} alignItems="center">
        <Typography color="white" fontWeight="bold">
          로그인이 필요합니다.
        </Typography>
        <Button variant="contained" onClick={() => getSpotifyAuthUrl()}>
          Log in
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          돌아가기
        </Button>
      </Stack>
    </Box>
  );
};

export default UnauthorizedPage;
