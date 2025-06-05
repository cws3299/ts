import { Alert } from "@mui/material";
import { ReactNode } from "react";

interface ErrorMessage {
  errorMessage: string;
}

const ErroeMessage = ({ errorMessage }: ErrorMessage): ReactNode => {
  return <Alert severity="error">{errorMessage}</Alert>;
};

export default ErroeMessage;
