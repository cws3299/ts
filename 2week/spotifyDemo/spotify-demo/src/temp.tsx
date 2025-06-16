import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword || keyword.trim() === "") {
      // 검색어가 비어 있으면 /search로 이동
      navigate("/search", { replace: true });
    }
  }, [keyword, navigate]);

  return <div>Search results for: {keyword}</div>;
};

export default SearchWithKeywordPage;
