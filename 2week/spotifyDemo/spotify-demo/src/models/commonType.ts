export interface ExternalUrls {
  spotify?: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restriction {
  reason?: string;
}

export interface Followers {
  hred?: string | null;
  total?: number;
}

export interface ExplicitContent {
  filter_enabled?: boolean;
  filter_locked?: boolean;
}

export interface Owner {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
  display_name?: string | null;
}

export interface Copyright {
  text?: string;
  type?: string;
}
