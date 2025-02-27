export default function HeartIcon({
  isActive,
  handleIsLiked,
}: {
  isActive: boolean;
  handleIsLiked: () => void;
}) {
  return (
    <svg
      viewBox=" 0 0 256 256"
      height={26}
      width={26}
      xmlns="http://www.w3.org/2000/svg"
      fill={isActive ? "red" : "none"}
      onClick={handleIsLiked}
      style={{
        cursor: "pointer",
      }}
    >
      <rect fill="none" height="26" width="26" />
      <path
        strokeWidth={12}
        stroke={isActive ? "none" : "rgb(90, 90, 90)"}
        d="M176,32a60,60,0,0,0-48,24A60,60,0,0,0,20,92c0,71.9,99.9,128.6,104.1,131a7.8,7.8,0,0,0,3.9,1,7.6,7.6,0,0,0,3.9-1,314.3,314.3,0,0,0,51.5-37.6C218.3,154,236,122.6,236,92A60,60,0,0,0,176,32Z"
      />
    </svg>
  );
}
