/**
 * 이미지 URL을 받아서 프리로드하는 함수
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * 여러 이미지들을 동시에 프리로드하는 함수
 */
export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  try {
    await Promise.all(imageUrls.map((url) => preloadImage(url)));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
    // 일부 이미지가 실패해도 계속 진행
  }
};

/**
 * 타임아웃과 함께 이미지를 프리로드하는 함수
 */
export const preloadImagesWithTimeout = async (
  imageUrls: string[],
  timeoutMs: number = 3000,
): Promise<void> => {
  const timeoutPromise = new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeoutMs);
  });

  const preloadPromise = preloadImages(imageUrls);

  // 프리로딩이 완료되거나 타임아웃 중 먼저 완료되는 것을 기다림
  await Promise.race([preloadPromise, timeoutPromise]);
};
