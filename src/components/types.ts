export type HomeCarouselData = {
  totalImages: number;
  baseDir: string;
};

export interface HomePageData {
  carousel: HomeCarouselData;
}

export interface AlbumData {
  id: string;
  displayName: string;
  thumbnailUrl: string;
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

export interface GoogleDriveMimeFilterOptions {
  mimeTypeFilter?: string;
}

export interface CarouselImage {
  id: string;
  url: string;
  name: string;
}

export interface GoogleDriveResponse {
  files: GoogleDriveFile[];
}
