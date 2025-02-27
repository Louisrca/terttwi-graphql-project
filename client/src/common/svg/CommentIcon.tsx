export default function CommentIcon({ onClick }: { onClick: () => void }) {
  return (
    <>
      <style>
        {`
       .comment-icon:hover {
  fill:rgb(184, 184, 184); /* Couleur au survol */
}
            `}
      </style>
      <svg
        width="22"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        className="comment-icon"
        style={{
          cursor: "pointer",
          transition: "fill 0.2s",
        }}
        fill="rgb(90, 90, 90)"
      >
        <g>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zm-.692-2H20V5H4v13.385L5.763 17zM11 10h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z" />
        </g>
      </svg>
    </>
  );
}
