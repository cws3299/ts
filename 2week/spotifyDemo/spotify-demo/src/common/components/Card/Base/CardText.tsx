import { Typography } from "@mui/material";

interface Props {
  children: string;
  bold?: boolean;
  enableTooltip?: boolean;
}

// 이름이 긴 경우에 카드 ui가 늘어나길래 ellipsis 시켰습니다. 다만 사용자가 마우스 오버하면 명칭을 전부 확인은 시켜야 해서 tooltip기능을 넣었습니다.

const CardText = ({ children, bold = false, enableTooltip = true }: Props) => {
  return (
    <Typography
      fontWeight={bold ? "bold" : "normal"}
      noWrap
      title={enableTooltip ? children : undefined}
      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
    >
      {children}
    </Typography>
  );
};

export default CardText;
