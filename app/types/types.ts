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
