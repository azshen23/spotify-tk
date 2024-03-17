interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: string | null;
  total: number;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Item {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
  track?: TrackType;
}

interface TrackType {
  album: AlbumType;
  artists: ArtistType[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface AlbumType {
  album_type: string;
  artists: ArtistType[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface ExternalIds {
  isrc: string;
}

interface ArtistType {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface TopArtistsResponseType {
  items: Item[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: string | null;
}

export { ExternalUrls, Followers, Image, Item, TopArtistsResponseType };
