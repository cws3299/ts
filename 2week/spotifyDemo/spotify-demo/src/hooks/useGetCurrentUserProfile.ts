import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../api/userApi";
import { User } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  console.log("여기 다음에 탐");
  const accessToken = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["current-user-peofile"],
    queryFn: getCurrentUserProfile,
    enabled: !!accessToken,
  });
};

export default useGetCurrentUserProfile;
