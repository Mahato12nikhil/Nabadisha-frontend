
export const getCroppedImg = async (
  imageSrc: string,
  croppedAreaPixels: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = getCroppedCanvas(image, croppedAreaPixels);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg");
  });
};

export const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  };
  
  export const getCroppedCanvas = (
    image: HTMLImageElement,
    crop: { x: number; y: number; width: number; height: number }
  ): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    if (!ctx) {
      throw new Error("Canvas context is not available");
    }
  
    canvas.width = crop.width;
    canvas.height = crop.height;
  
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
  
    return canvas;
  };
  