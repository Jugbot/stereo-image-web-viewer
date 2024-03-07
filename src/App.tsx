import { ScreenSpace } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Controllers, Hands, VRButton, XR } from "@react-three/xr";
import { ChangeEventHandler, useState } from "react";
import "./App.css";
import { VRImages } from "./VRImages";

function App() {
  const [leftEyeImage, setLeftEyeImage] = useState<string | null>(null);
  const [rightEyeImage, setRightEyeImage] = useState<string | null>(null);
  const [imageDistance, setImageDistance] = useState<number>(10);

  const handleLeftEyeImageChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (!event.target.files) {
      setLeftEyeImage(null);
      return;
    }
    setLeftEyeImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleRightEyeImageChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (!event.target.files) {
      setRightEyeImage(null);
      return;
    }
    setRightEyeImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSwapImages = () => {
    const temp = leftEyeImage;
    setLeftEyeImage(rightEyeImage);
    setRightEyeImage(temp);
  };

  const handleImageDistanceChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setImageDistance(Number(event.target.value));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "8px",
          padding: "8px",
        }}
      >
        <label htmlFor="left-eye">Upload Left Eye Image</label>
        <input
          type="file"
          id="left-eye"
          name="left-eye"
          accept="image/*"
          onChange={handleLeftEyeImageChange}
        />
        <label htmlFor="right-eye">Upload Right Eye Image</label>
        <input
          type="file"
          id="right-eye"
          name="right-eye"
          accept="image/*"
          onChange={handleRightEyeImageChange}
        />
        <button onClick={handleSwapImages}>Swap images</button>
        <input
          value={imageDistance}
          onChange={handleImageDistanceChange}
          type="range"
          min="0"
          max="20"
          step="1"
        />
        <div style={{ display: "flex" }}>
          <img
            src={leftEyeImage ?? undefined}
            alt="Left Eye"
            style={{ height: "4in" }}
          />
          <img
            src={rightEyeImage ?? undefined}
            alt="Right Eye"
            style={{ height: "4in" }}
          />
        </div>
      </div>
      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />

          {/* <mesh>
            <planeGeometry />
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh> */}
          <ScreenSpace
            depth={imageDistance} // Distance from camera
          >
            <VRImages
              leftEyeImage={leftEyeImage}
              rightEyeImage={rightEyeImage}
            />
          </ScreenSpace>
          {/* <mesh
            onBeforeRender={(
              renderer,
              scene,
              camera,
            ) => {
              const frame = renderer.xr.getFrame();
              const referenceSpace = renderer.xr.getReferenceSpace();
              if (!referenceSpace) {
                return;
              }
              const pose = frame.getViewerPose(referenceSpace);
              const session = frame.session;
              if (!pose) {
                return;
              }
              const leftEye = session.renderState.baseLayer?.getViewport(pose.views[0]);
              const rightEye = session.renderState.baseLayer?.getViewport(pose.views[1]);
              // console.log('Left eye camera viewport:', leftEye);
              // console.log('Right eye camera viewport:', rightEye);
              if (texture && leftEye && rightEye) {
                renderer.setRenderTarget(null);
                renderer.clear();
                renderer.setScissorTest(true);

                // Render to the left eye
                renderer.setViewport(leftEye.x, leftEye.y, leftEye.width, leftEye.height);
                renderer.setScissor(leftEye.x, leftEye.y, leftEye.width, leftEye.height);
                // renderer.render(scene, camera);

                // Render to the right eye
                // renderer.setViewport(rightEye.x, rightEye.y, rightEye.width, rightEye.height);
                // renderer.setScissor(rightEye.x, rightEye.y, rightEye.width, rightEye.height);
                // renderer.render(scene, camera);

                // renderer.setScissorTest(false);
              }
            }}
          >
            <planeGeometry />
            <meshBasicMaterial color="red" />
            <meshBasicMaterial map={texture}/>
          </mesh> */}
        </XR>
      </Canvas>
    </>
  );
}

export default App;
