export default function ComingSoonBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover lg:object-[center_calc(100%+50px)]"
        src={"/comingSoonPage/video-background.mp4"}
        poster={"/comingSoonPage/poster-background.jpg"}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60" />
    </div>
  );
}
