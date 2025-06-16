import axios from "axios";
import { SpotifyBaseUrl } from "../config/commonConfig";
import {
  BrowseCategoriesRequest,
  GetCategoriesAPIResponse,
  SearchRequestParams,
  SearchResponse,
} from "../models/search";

export const searchItemsByKeyowrd = async (
  token: string,
  params: SearchRequestParams
): Promise<SearchResponse> => {
  try {
    // 해당 api의 경우 authentication이 필요없음
    // search의 경우 메인의 search에서도 사용하므로, 로그인안되도 검색가능하게 함
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(","));

    if (params.market) searchParams.append("market", params.market);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.include_external)
      searchParams.append("include_external", params.include_external);

    const response = await axios.get(
      `${SpotifyBaseUrl}/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("fail to search by keyword");
  }
};

export const getSearchCategories = async (
  token: string,
  params: BrowseCategoriesRequest
): Promise<GetCategoriesAPIResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("locale", params.locale);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());

    const response = await axios.get<GetCategoriesAPIResponse>(
      `${SpotifyBaseUrl}/browse/categories?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("fail to getSearchCategories");
  }
};

export const getSearchResult = async (
  token: string,
  params: SearchRequestParams
): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(","));

    if (params.market) searchParams.append("market", params.market);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.include_external)
      searchParams.append("include_external", params.include_external);

    console.log(`${SpotifyBaseUrl}/search?${searchParams.toString()}`);

    const response = await axios.get(
      `${SpotifyBaseUrl}/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("fail search ");
  }
};
