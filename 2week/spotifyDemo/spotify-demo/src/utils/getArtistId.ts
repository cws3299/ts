const artistIdObject: Record<string, string> = {
  프로미스나인: "24nUVBIlCGi4twz4nYxJum",
  빅뱅: "4Kxlr1PRlDKEB0ekOCyHgX",
};

const getArtistId = (artistNameList: string[]): string[] => {
  const artistIdList = artistNameList.map((name) => artistIdObject[name]);
  return artistIdList;
};

export default getArtistId;
