export type HomeCarouselData = {
  totalImages: number;
  baseDir: string;
};

export interface HomePageData {
  carousel: HomeCarouselData;
}

export interface AlbumData {
  id: string;
  name: string;
  displayName: string;
  thumbnail: string;
  count: number;
  driveFiles: GoogleDriveFile[];
}

export interface AppMetaData {
  albums: AlbumData[];
  home: HomePageData;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
}

export interface GoogleDriveResponse {
  files: GoogleDriveFile[];
}
