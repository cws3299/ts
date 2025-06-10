import { PlaylistTrack } from "../models/playlist";
import { Episode, Track } from "../models/track";

type TrackWithDuration = Track & { duration?: string };
type EpisodeWithDuration = Episode & { duration?: string };

type PlaylistTrackWithDuration = Omit<PlaylistTrack, "track"> & {
  track: TrackWithDuration | EpisodeWithDuration;
};

// 데이터를 바로 바꾸는게 아니라, duration과 added_at만 변경하고 나머지는 참조 유지하도록 카피온라이트로 적용
export const convertPlayListItem = (
  data: PlaylistTrack
): PlaylistTrackWithDuration => {
  let newAddedAt;

  if (data.added_at) {
    const date = new Date(data.added_at);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    newAddedAt = `${yyyy}-${mm}-${dd}`;
  }

  // 2. track_duration 계산: "MM:SS"
  let newTrack = data.track;
  if (data.track && typeof data.track.duration_ms === "number") {
    const totalSeconds = Math.floor(data.track.duration_ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    newTrack = {
      ...data.track,
      duration: `${minutes}:${seconds}`,
    } as TrackWithDuration | EpisodeWithDuration;
  }

  // 3. 얕은 복사 기반으로 필요한 필드만 교체
  return {
    ...data,
    added_at: newAddedAt || data.added_at,
    track: newTrack,
  };
};
