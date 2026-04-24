export default function ComingSoonPartnerCard({
  image,
  alt = "Partner",
  link,
}) {
  const wrapperClasses =
    "group relative h-10 flex-1 basis-0 min-w-0 opacity-80 transition-all duration-300 hover:scale-[1.02] hover:opacity-100 md:h-24 md:w-56 md:flex-none md:basis-auto lg:h-16 lg:w-40";

  const img = (
    <img
      src={image}
      alt={alt}
      className="absolute inset-0 h-full w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0"
    />
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={wrapperClasses}
    >
      {img}
    </a>
  ) : (
    <div className={wrapperClasses}>{img}</div>
  );
}
