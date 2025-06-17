import { Grid, Typography } from "@mui/material";
import LoadingSpinner from "../../../common/components/loadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { ReleaseAlbumCard } from "../../../common/components/Card";
import { GetArtistTopTrackResponse } from "../../../models/track";

type ArtistTopTracksProps = {
  data?: GetArtistTopTrackResponse;
  error?: any;
  isLoading: boolean;
  artistName: string;
};

const NewReleases = ({
  data,
  error,
  isLoading,
  artistName,
}: ArtistTopTracksProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        {artistName}의 Top Track!
      </Typography>
      {data?.tracks && data?.tracks?.length > 0 ? (
        <Grid container spacing={2}>
          {data?.tracks?.slice(0, 6).map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
              <ReleaseAlbumCard
                image={item?.album?.images[0]?.url || ""}
                name={item?.name || ""}
                artistName={item?.artists?.[0]?.name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>데이터가 없습니다</Typography>
      )}
    </div>
  );
};

export default NewReleases;
