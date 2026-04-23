export default function ComingSoonNavBarButton({
  href = "#",
  label,
  external = true,
  onClick,
}) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target={external && !onClick ? "_blank" : undefined}
      rel={external && !onClick ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 py-3 text-sm text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10 md:px-7 md:py-3 md:text-base"
    >
      <span>{label}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
      >
        <path
          d="M5.25 10.5L8.75 7L5.25 3.5"
          stroke="#F1F1F1"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
