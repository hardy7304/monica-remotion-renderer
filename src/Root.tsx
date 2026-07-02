import { Composition } from "remotion";
import { MonicaDemo } from "./MonicaDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MonicaDemo"
      component={MonicaDemo}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        title: "Monica Remotion Renderer",
        subtitle: "Automatic video rendering pipeline",
      }}
    />
  );
};