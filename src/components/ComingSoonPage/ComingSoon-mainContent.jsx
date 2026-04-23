import ComingSoonCountdown from "./ComingSoon-countdown";
import ComingSoonForm from "./ComingSoon-form";

export default function ComingSoonMainContent({
  headline = "Liderando la transformación digital de empresas y administraciones",
}) {
  return (
    // flex-1 centra todo en el espacio intermedio de la tarjeta oscura
    <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-3 px-4 text-center sm:gap-4 md:gap-6 md:px-8">
      {/* Nota: corregido text-l (no existe en tailwind) por text-xl o 2xl */}
      <h1 className="max-w-3xl text-5xl leading-tight tracking-[-0.84px] text-white sm:text-5xl md:text-5xl lg:text-5xl">
        {headline}
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xl">
        <ComingSoonCountdown />

        <ComingSoonForm />
      </div>
    </div>
  );
}
