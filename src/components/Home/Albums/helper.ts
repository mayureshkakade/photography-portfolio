import {
  AlbumData,
  GoogleDriveFile,
  GoogleDriveResponse,
} from '@/components/types';

export const getThumbnailImage = (images: GoogleDriveFile[]) => {
  const imageId =
    images.length > 0
      ? images.find((image) => image.name.includes('thumbnail'))?.id
      : '';
  return `https://lh3.googleusercontent.com/d/${imageId}`;
};

export const getAlbumDisplayName = (images: GoogleDriveFile[]) => {
  const thumbnailImage = images.find((image) =>
    image.name.includes('thumbnail')
  );
  const displayName = thumbnailImage?.name.split('.')[1] || '';
  return displayName;
};
/**
 * Fetches album details from Google Drive API
 * @param folderId - The Google Drive folder ID
 * @param apiKey - The Google API key
 * @returns Promise with album image count and thumbnail URL
 */
export async function fetchAlbumDetails(folderId: string, apiKey: string) {
  try {
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name)`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch album details. Status: ${response.status}`
      );
    }

    const data: GoogleDriveResponse = await response.json();
    const imageFiles = data.files;

    // Get the count of images
    const count = imageFiles.length;

    // Get the first image as thumbnail (if available)
    const thumbnail = getThumbnailImage(imageFiles);
    const displayName = getAlbumDisplayName(imageFiles);

    return {
      count,
      thumbnail,
      imageFiles,
      displayName,
      name: displayName,
    };
  } catch (error) {
    console.error(
      `Error fetching album details for folder ${folderId}:`,
      error
    );
    return {
      count: 0,
      thumbnail: '',
      name: '',
      displayName: '',
      imageFiles: [],
    };
  }
}

/**
 * Fetches details for multiple albums from Google Drive
 * @param albums - Array of album data with folder IDs
 * @param apiKey - The Google API key
 * @returns Promise with updated album data including count and thumbnail
 */
export async function fetchAllAlbumsDetails(
  albums: AlbumData[],
  apiKey: string
): Promise<AlbumData[]> {
  const albumPromises = albums.map(async (album) => {
    const details = await fetchAlbumDetails(album.id, apiKey);
    return {
      id: album.id,
      name: details.name,
      displayName: details.displayName,
      count: details.count,
      thumbnail: details.thumbnail || album.thumbnail, // Fallback to original thumbnail if no images found
      driveFiles: details.imageFiles,
    };
  });

  return Promise.all(albumPromises);
}
