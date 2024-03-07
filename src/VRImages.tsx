import { Image } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

interface VRImagesProps {
  leftEyeImage?: string | null;
  rightEyeImage?: string | null;
}

export function VRImages({
  leftEyeImage = null,
  rightEyeImage = null,
}: VRImagesProps) {
  const { viewport } = useThree();

  // Calculate the width and height based on the viewport
  const width = viewport.width;
  const height = viewport.height;

  return (
    <>
      {/* Left Eye Image */}
      {leftEyeImage && (
        <Image
          url={leftEyeImage}
          scale={[width, height]}
          layers={1} // Render on the left eye's layer
        />
      )}

      {/* Right Eye Image */}
      {rightEyeImage && (
        <Image
          url={rightEyeImage}
          scale={[width, height]}
          layers={2} // Render on the right eye's layer
        />
      )}
    </>
  );
}
