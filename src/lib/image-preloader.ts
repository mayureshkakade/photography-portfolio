/**
 * Image preloading utilities for better performance
 */

export interface ImageData {
  id: string;
  name: string;
  url?: string;
}

/**
 * Preloads an image and returns a promise that resolves when loading is complete
 * @param src - Image source URL
 * @returns Promise that resolves when image is loaded
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));

    // Set crossOrigin to handle CORS for Google Drive images
    img.crossOrigin = 'anonymous';
    img.src = src;
  });
};

/**
 * Preloads multiple images with optional concurrency limit
 * @param urls - Array of image URLs to preload
 * @param concurrency - Maximum number of concurrent preloads (default: 3)
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = async (
  urls: string[],
  concurrency = 3
): Promise<void> => {
  const chunks: string[][] = [];

  // Split URLs into chunks based on concurrency limit
  for (let i = 0; i < urls.length; i += concurrency) {
    chunks.push(urls.slice(i, i + concurrency));
  }

  // Process chunks sequentially, but items within each chunk concurrently
  for (const chunk of chunks) {
    await Promise.allSettled(chunk.map(preloadImage));
  }
};

/**
 * Preloads adjacent images in a gallery for smoother navigation
 * @param images - Array of image data
 * @param currentIndex - Current image index
 * @param getImageUrl - Function to get optimized URL from image data
 * @param range - Number of images to preload in each direction (default: 2)
 */
export const preloadAdjacentImages = async (
  images: ImageData[],
  currentIndex: number,
  getImageUrl: (image: ImageData) => string,
  range = 2
): Promise<void> => {
  const urlsToPreload: string[] = [];

  // Get URLs for adjacent images
  for (
    let i = Math.max(0, currentIndex - range);
    i <= Math.min(images.length - 1, currentIndex + range);
    i++
  ) {
    if (i !== currentIndex) {
      urlsToPreload.push(getImageUrl(images[i]));
    }
  }

  // Preload with limited concurrency to avoid overwhelming the browser
  await preloadImages(urlsToPreload, 2);
};

/**
 * Creates an intersection observer for more efficient lazy loading
 * @param callback - Function to call when element intersects
 * @param options - Intersection observer options
 * @returns IntersectionObserver instance
 */
export const createLazyLoadObserver = (
  callback: (_entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px', // Start loading 50px before element comes into view
    threshold: 0.1, // Trigger when 10% of element is visible
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
};
