import {
  AlbumData,
  GoogleDriveFile,
  AppImageData,
  GoogleDriveMimeFilterOptions,
  FilmItem,
} from '@/components/types';

// Export fetchGoogleDriveFilesFromFolder for external use
export { fetchGoogleDriveFilesFromFolder };

export type ImageSize = 'thumb' | 'medium' | 'large' | 'full';

/**
 * Generates an optimized Google Drive image URL for a specific size.
 */
export const getOptimizedGoogleDriveUrl = (
  fileId: string,
  size: ImageSize = 'medium'
): string => {
  const sizeMap = {
    thumb: '=s300',
    medium: '=s600',
    large: '=s1200',
    full: '',
  };
  return `https://lh3.googleusercontent.com/d/${fileId}${sizeMap[size]}`;
};

/**
 * Returns a base64-encoded SVG placeholder image (for blur effect).
 */
export const getBlurPlaceholder = (): string => {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjVmNWY1O3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6I2VlZWVlZTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTVlNWU1O3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8ZmlsdGVyIGlkPSJibHVyIj4KPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjAuNSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9InVybCgjZ3JhZGllbnQpIiBmaWx0ZXI9InVybCgjYmx1cikiLz4KPC9zdmc+';
};

// Responsive Image Sizes and Dimensions
export const imageSizes = {
  gallery: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  lightbox: '90vw',
  thumbnail: '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw',
  cover: '100vw',
};

export const imageDimensions = {
  gallery: { width: 600, height: 400 },
  lightbox: { width: 1600, height: 1067 },
  thumbnail: { width: 300, height: 200 },
  cover: { width: 1200, height: 438 },
};

/**
 * General-purpose fetch for raw Google Drive files from a folder.
 */
async function fetchGoogleDriveFilesFromFolder(
  folderId: string,
  apiKey: string,
  options?: GoogleDriveMimeFilterOptions
): Promise<GoogleDriveFile[]> {
  let query = `'${folderId}'+in+parents`;
  if (options?.mimeTypeFilter) {
    query += "+and+mimeType+contains+'" + options.mimeTypeFilter + "'";
  }
  const apiUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)&key=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error('Failed to fetch files from Google Drive');
  const data = await response.json();
  return data.files || [];
}

/**
 * Maps Google Drive files to a CarouselImage array for use in carousels.
 */
function mapDriveFilesToImages(
  files: GoogleDriveFile[],
  size: ImageSize = 'large'
): AppImageData[] {
  return files.map((file) => ({
    id: file.id,
    url: getOptimizedGoogleDriveUrl(file.id, size),
    name: file.name,
  }));
}

/**
 * Fetches images from a Google Drive folder for use in a Carousel.
 */
export const fetchGoogleDriveImages = async (
  folderId: string,
  apiKey: string,
  size: ImageSize = 'full'
): Promise<Array<AppImageData>> => {
  const files = await fetchGoogleDriveFilesFromFolder(folderId, apiKey, {
    mimeTypeFilter: 'image/',
  });
  return mapDriveFilesToImages(files, size);
};

export const fetchFilmData = async (
  folderId: string,
  apiKey: string
): Promise<FilmItem[]> => {
  const files = await fetchGoogleDriveFilesFromFolder(folderId, apiKey);
  const jsonFile = files.find((f) =>
    f.name.toLowerCase().includes('films.json')
  );

  let filmsJson: { url: string; imageName: string }[] = [];
  if (jsonFile) {
    const jsonUrl = `https://www.googleapis.com/drive/v3/files/${jsonFile.id}?alt=media&key=${apiKey}`;
    const res = await fetch(jsonUrl);
    if (res.ok) {
      filmsJson = await res.json();
    }
  }

  const imageFiles = files.filter(
    (f) => f.name !== jsonFile?.name && /\.(jpg|jpeg|png|webp)$/i.test(f.name)
  );

  return filmsJson.map((film) => {
    const imageFile = imageFiles.find(
      (img) => img.name.split('.')[0] === film.imageName
    );
    const thumbnailUrl = imageFile
      ? getOptimizedGoogleDriveUrl(imageFile.id, 'full')
      : '';
    return { ...film, thumbnailUrl };
  });
};

/**
 * Fetches the first cover image from a Google Drive folder.
 */
export const fetchSingleCoverImage = async (
  folderId: string,
  apiKey: string,
  size: ImageSize = 'full'
): Promise<AppImageData> => {
  const images = await fetchGoogleDriveImages(folderId, apiKey, size);
  return images.length > 0 ? images[0] : { id: '', url: '', name: '' };
};

/**
 * Finds and returns the thumbnail image URL from Google Drive images.
 */
export const getThumbnailImage = (images: GoogleDriveFile[]) => {
  const imageId =
    images.length > 0
      ? images.find((image) => image.name.includes('thumbnail'))?.id
      : '';
  return imageId ? getOptimizedGoogleDriveUrl(imageId, 'thumb') : '';
};

/**
 * Extracts a display name for an album from its thumbnail image name.
 */
export const getAlbumDisplayName = (images: GoogleDriveFile[]) => {
  const thumbnailImage = images.find((image) =>
    image.name.includes('thumbnail')
  );
  const displayName = thumbnailImage?.name.split('.')[1] || '';
  return displayName;
};

/**
 * Fetches raw image files for a single album (Google Drive folder).
 */
export async function fetchGoogleDriveAlbumFiles(
  folderId: string,
  apiKey: string
): Promise<GoogleDriveFile[]> {
  // Use the general-purpose folder fetcher with MIME filter for images
  return await fetchGoogleDriveFilesFromFolder(folderId, apiKey, {
    mimeTypeFilter: 'image/',
  });
}

/**
 * Maps Google Drive files to an AlbumData object.
 */
export function mapAlbumDetails(
  albumId: string,
  imageFiles: GoogleDriveFile[]
): AlbumData {
  const thumbnailImage = getThumbnailImage(imageFiles);
  const displayName = getAlbumDisplayName(imageFiles);
  return {
    id: albumId,
    displayName,
    thumbnailUrl: thumbnailImage,
    driveFiles: imageFiles,
  };
}

/**
 * Fetches and maps details for multiple albums (Google Drive folders).
 */
export async function fetchAllAlbumsDetails(
  albums: Pick<AlbumData, 'id'>[],
  apiKey: string
): Promise<AlbumData[]> {
  const albumPromises = albums.map(async (album) => {
    const imageFiles = await fetchGoogleDriveAlbumFiles(album.id, apiKey);
    return mapAlbumDetails(album.id, imageFiles);
  });
  return Promise.all(albumPromises);
}
