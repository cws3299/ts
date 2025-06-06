import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../api/authApi";
import { ExchangeTokenResponse } from "../models/auth";

interface Parameter {
  code: string;
  codeVerifier: string;
}

const useExchangeToken = () => {
  const queryClient = useQueryClient();
  return useMutation<ExchangeTokenResponse, Error, Parameter>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      queryClient.invalidateQueries({
        queryKey: ["current-user-peofile"],
      });
    },
    retry: false,
  });
};

export default useExchangeToken;
