import ComingSoonBackground from "./ComingSoon-background";
import ComingSoonNavBar from "./ComingSoon-navBar";
import ComingSoonMainContent from "./ComingSoon-mainContent";
import ComingSoonLogosCarousel from "./ComingSoon-logosCarousel";
import ComingSoonPartnersSection from "./ComingSoon-partnersSection";

export default function ComingSoonPage({ targetDate, logoSrc }) {
  return (
    // 1. Usamos 100dvh y overflow-hidden para matar el scroll. El padding crea el "marco" exterior.
    <div className="flex h-dvh w-screen flex-col bg-[#f1f1f1] font-sans text-white p-4">
      {/* 2. Tarjeta principal: flex-1 le dice que ocupe todo el espacio disponible. */}
      <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl bg-black">
        <ComingSoonBackground />

        {/* 3. Layout interno distribuido con justify-between */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between">
          <ComingSoonNavBar logoSrc={logoSrc} />

          <ComingSoonMainContent targetDate={targetDate} />

          {/* El carrusel se queda pegado abajo dentro de la tarjeta */}
          <div className="w-full shrink-0 pt-2 pb-6 md:py-4 md:pb-12">
            <ComingSoonLogosCarousel />
          </div>
        </div>
      </div>

      {/* 4. Sección inferior. */}
      <ComingSoonPartnersSection />
    </div>
  );
}
