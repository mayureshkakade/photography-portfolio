export type HomeCarouselData = {
  totalImages: number;
  baseDir: string;
};

export interface HomePageData {
  carousel: HomeCarouselData;
}

export interface AlbumData {
  id: number;
  name: string;
  displayName: string;
  thumbnail: string;
  count: number;
}

export interface AppMetaData {
  albums: AlbumData[];
  home: HomePageData;
}
