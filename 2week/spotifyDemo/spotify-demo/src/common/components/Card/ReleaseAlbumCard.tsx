import { Box } from "@mui/material";
import { BaseCard, CardImage, CardText } from "./Base";
import PlayButton from "../PlayButton";

interface Props {
  image: string;
  name: string;
  artistName?: string;
}

// 뭔가 나중에는 마우스 오버시에 아예 다른 상호작용이 발생하는 카드가 생길것 같아서
// ReleaseAlbumCard는 도메인에 따라 분리
// 그런데 지금 구조가 뭔가 좀 이상한거 같은데. 추후 수정하겠습니다.

const ReleaseAlbumCard = ({ image, name, artistName }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover .overlay": {
          opacity: 1,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <BaseCard>
        <Box sx={{ position: "relative", width: "100%" }}>
          <CardImage src={image} />

          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 1,
              opacity: 0,
              transition:
                "opacity 0.3s ease-in-out, background-color 0.3s ease-in-out",
              backgroundColor: "rgba(0, 0, 0, 0)",
              zIndex: 1,
            }}
          >
            <PlayButton />
          </Box>
        </Box>

        <CardText bold>{name}</CardText>
        <CardText>{artistName ?? "No artist Name"}</CardText>
      </BaseCard>
    </Box>
  );
};

export default ReleaseAlbumCard;
