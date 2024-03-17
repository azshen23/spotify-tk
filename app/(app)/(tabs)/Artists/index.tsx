import MusicItem from "../../../components/MusicItem";
import TopItems from "../../../components/TopItems";

export default function Artists() {
  return (
    <TopItems
      baseUrl="https://api.spotify.com/v1/me/top/artists"
      renderItem={(artist, index) => (
        <MusicItem
          key={artist.id}
          item={artist}
          imageSrc={artist}
          count={index}
          link={`artist:${artist.id}`}
        />
      )}
    />
  );
}
