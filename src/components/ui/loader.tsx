import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <BeatLoader 
        color="var(--color-primary)" 
        size={15} 
        aria-label="Loading Spinner" 
        data-testid="loader" 
      />
    </div>
  );
}

export default Loader;
