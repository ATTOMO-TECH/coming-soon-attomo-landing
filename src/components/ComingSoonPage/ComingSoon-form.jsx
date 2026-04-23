import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export default function ComingSoonForm({
  subject = "Contacto desde la web de ATTOMO",
}) {
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [status, setStatus] = useState("idle");

  const nombreRef = useRef(null);
  const shakeControls = useAnimationControls();

  useEffect(() => {
    const handler = () => {
      nombreRef.current?.focus();
      shakeControls.start({
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    };
    window.addEventListener("attomo:contact-click", handler);
    return () => window.removeEventListener("attomo:contact-click", handler);
  }, [shakeControls]);

  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const t = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(t);
  }, [status]);

  const onChange = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: values.nombre,
          nombre: values.nombre,
          email: values.email,
          telefono: values.telefono,
          mensaje: values.mensaje,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setValues({ nombre: "", email: "", telefono: "", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full border-b border-white/20 bg-transparent pb-1.5 text-sm text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none disabled:opacity-50";
  const labelClass = "block text-[11px] tracking-wide text-white/60 mb-1";
  const isSending = status === "sending";

  return (
    <motion.form
      onSubmit={onSubmit}
      animate={shakeControls}
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-7"
    >
      <h2 className="mb-4 text-3xl text-white md:mb-6 md:text-lg text-align-left">
        No te pierdas nada — Escríbenos
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5">
        <div className="flex flex-col items-start">
          <label className={labelClass} htmlFor="csf-nombre">
            Nombre
          </label>
          <input
            id="csf-nombre"
            ref={nombreRef}
            type="text"
            required
            disabled={isSending}
            value={values.nombre}
            onChange={onChange("nombre")}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className={labelClass} htmlFor="csf-email">
            Email
          </label>
          <input
            id="csf-email"
            type="email"
            required
            disabled={isSending}
            value={values.email}
            onChange={onChange("email")}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className={labelClass} htmlFor="csf-telefono">
            Teléfono
          </label>
          <input
            id="csf-telefono"
            type="tel"
            disabled={isSending}
            value={values.telefono}
            onChange={onChange("telefono")}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className={labelClass} htmlFor="csf-mensaje">
            Mensaje
          </label>
          <input
            id="csf-mensaje"
            type="text"
            placeholder="Cuéntanos más"
            disabled={isSending}
            value={values.mensaje}
            onChange={onChange("mensaje")}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="relative mt-5 flex justify-center md:mt-7">
        <button
          type="submit"
          disabled={isSending}
          className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 py-3 text-sm text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10 disabled:opacity-60 md:px-7 md:py-3 md:text-base"
        >
          <span>{isSending ? "Enviando..." : "Enviar"}</span>
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
        </button>

        <AnimatePresence>
          {(status === "success" || status === "error") && (
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`pointer-events-none absolute left-0 right-0 top-full mt-2 text-center text-xs ${
                status === "success" ? "text-white/80" : "text-red-300"
              }`}
            >
              {status === "success"
                ? "¡Gracias! Te responderemos pronto."
                : "No se pudo enviar. Inténtalo de nuevo."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
