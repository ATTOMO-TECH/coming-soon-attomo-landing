import ComingSoonCountdown from "./ComingSoon-countdown";
import ComingSoonForm from "./ComingSoon-form";

export default function ComingSoonMainContent({
  headline = "Liderando la transformación digital de empresas y administraciones",
}) {
  return (
    <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-3 px-4 text-center sm:gap-4 md:gap-6 md:px-8">
      <h1 className="max-w-3xl leading-tight text-white text-[clamp(1.25rem,4dvh,3rem)] md:text-4xl lg:text-5xl">
        {headline}
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xl">
        <ComingSoonCountdown />

        <ComingSoonForm />
      </div>
    </div>
  );
}
