import MusicItem from "../../../components/MusicItem";
import TopItems from "../../../components/TopItems";

export default function Tracks() {
  return (
    <TopItems
      baseUrl="https://api.spotify.com/v1/me/top/tracks"
      renderItem={(track, index) => (
        <MusicItem
          key={track.id}
          item={track}
          imageSrc={track.album}
          count={index}
          link={`track:${track.id}`}
        />
      )}
    />
  );
}
