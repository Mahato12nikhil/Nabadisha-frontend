import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/utility";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";

interface ProfileImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  onClose: () => void;
}

const ProfileImageCropper: React.FC<ProfileImageCropperProps> = ({ imageSrc , onCropComplete, onClose }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);

  const onCropCompleteHandler = useCallback((_: any, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
    setCroppedAreaPixels(croppedAreaPixels);

  }, []);

  const handleCropImage = async () => {
    try {
      if (!croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log(croppedImage)
      onCropComplete(croppedImage);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-centerbg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">Crop Image</h2>
        <div className="relative w-full h-64">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
          />
        </div>
        <div className="mt-4">
        <Slider min={1} max={3} step={0.1} value={[zoom]} onValueChange={(val) => setZoom(val[0])} />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleCropImage}>Crop & Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageCropper;