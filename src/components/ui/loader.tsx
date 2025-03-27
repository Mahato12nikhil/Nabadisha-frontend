import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
  const [loading] = useState(true);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-50  w-full h-full flex items-center justify-center bg-trasparent/20">
      <div className="animate-pulse flex justify-center">
        <BeatLoader
          color="var(--color-primary)" 
          loading={loading}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
