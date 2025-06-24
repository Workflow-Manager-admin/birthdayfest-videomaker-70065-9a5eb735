import { Composition } from "remotion";
import { BirthdayVideo } from "./BirthdayVideo";
import { BIRTHDAY_VIDEO_SCHEMA } from "./BirthdayVideo/constants";

// PUBLIC_INTERFACE
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BirthdayVideo"
        component={BirthdayVideo}
        durationInFrames={300}
        fps={30}
        width={720}
        height={1280}
        schema={BIRTHDAY_VIDEO_SCHEMA}
        defaultProps={{
          name: "Alex",
          primary: "#7DD3FC",
          secondary: "#FDE68A",
          accent: "#F472B6",
        }}
      />
    </>
  );
};
