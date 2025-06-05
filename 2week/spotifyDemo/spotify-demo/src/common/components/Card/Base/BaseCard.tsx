import { Paper } from "@mui/material";
import { ReactNode } from "react";

const BaseCard = ({ children }: { children: ReactNode }) => {
  return <Paper style={{ padding: 2, borderRadius: 2 }}>{children}</Paper>;
};

export default BaseCard;
