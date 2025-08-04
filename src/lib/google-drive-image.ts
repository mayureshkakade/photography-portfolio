/**
 * Google Drive image optimization utilities
 */

export type ImageSize = 'thumb' | 'medium' | 'large' | 'full';

/**
 * Creates optimized Google Drive image URLs with size parameters
 * @param fileId - Google Drive file ID
 * @param size - Desired image size
 * @returns Optimized Google Drive URL
 */
export const getOptimizedGoogleDriveUrl = (
  fileId: string,
  size: ImageSize = 'medium'
): string => {
  const sizeMap = {
    thumb: '=s300', // 300px max dimension - for thumbnails
    medium: '=s600', // 600px max dimension - for gallery grid
    large: '=s1200', // 1200px max dimension - for lightbox
    full: '', // Original size - for full resolution
  };

  return `https://lh3.googleusercontent.com/d/${fileId}${sizeMap[size]}`;
};

/**
 * Creates a blur placeholder data URL for better loading experience
 * @returns Base64 encoded blur placeholder
 */
export const getBlurPlaceholder = (): string => {
  // Elegant gradient placeholder - soft gray to light gray with subtle blur effect
  // This creates a 10x10px image with a subtle diagonal gradient that looks professional
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjVmNWY1O3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6I2VlZWVlZTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTVlNWU1O3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8ZmlsdGVyIGlkPSJibHVyIj4KPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjAuNSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9InVybCgjZ3JhZGllbnQpIiBmaWx0ZXI9InVybCgjYmx1cikiLz4KPC9zdmc+';
};

/**
 * Responsive sizes configuration for different use cases
 */
export const imageSizes = {
  // For gallery grid images
  gallery: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',

  // For lightbox full-screen images
  lightbox: '90vw',

  // For album thumbnails
  thumbnail: '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw',

  // For cover images
  cover: '100vw',
};

/**
 * Default image dimensions for different use cases
 */
export const imageDimensions = {
  gallery: { width: 600, height: 400 },
  lightbox: { width: 1200, height: 800 },
  thumbnail: { width: 300, height: 200 },
  cover: { width: 1200, height: 438 },
};
