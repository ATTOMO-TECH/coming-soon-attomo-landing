import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const logos = [
  {
    id: "netflix",
    image: "/comingSoonPage/carrouselLogos/netflix.png",
    alt: "Netflix",
    link: "https://www.netflix.com",
  },
  {
    id: "flipeat",
    image: "/comingSoonPage/carrouselLogos/flipeat.png",
    alt: "FlipEat",
    link: "https://www.instagram.com/flipeat.app/",
  },
  {
    id: "dahlia",
    image: "/comingSoonPage/carrouselLogos/dahlia.png",
    alt: "Dahlia",
    link: "https://dahliadahlia.com/es", // Hay varias empresas llamadas Dahlia. Revisa si es dahlia.es u otra.
  },
  {
    id: "real-sociedad",
    image: "/comingSoonPage/carrouselLogos/real-sociedad.png",
    alt: "Real Sociedad",
    link: "https://www.realsociedad.eus",
  },
  {
    id: "pp",
    image: "/comingSoonPage/carrouselLogos/peterhousepartners.png",
    alt: "PP",
    link: "https://peterhousepartners.com",
  },
  {
    id: "asm",
    image: "/comingSoonPage/carrouselLogos/asm.png",
    alt: "Asociación Síndrome de Morquio",
    link: "https://asociacionsindromedemorquio.org/", // Web de la Asociación Española de las Mucopolisacaridosis
  },
  {
    id: "zityhub",
    image: "/comingSoonPage/carrouselLogos/zityhub.png",
    alt: "Zityhub",
    link: "https://zityhub.com",
  },
  {
    id: "valum",
    image: "/comingSoonPage/carrouselLogos/valum.png",
    alt: "Valum",
    link: "https://www.valumre.com/contrata-tasacion-online/?gad_source=1&gad_campaignid=14827923052&gbraid=0AAAAADxmeilddYICmEvff-4WLttYdrkVq&gclid=CjwKCAjwhqfPBhBWEiwAZo196r79NMZkkacr2H34QRyDSFPaTdPeuY2UZjC-6JpR81VQeXFoFtgqSRoCYXsQAvD_BwE",
  },
  {
    id: "clinica",
    image: "/comingSoonPage/carrouselLogos/cdi.png",
    alt: "Clínica Dermatológica Internacional",
    link: "https://www.clinicadermatologicainternacional.com/",
  },
  {
    id: "kiri",
    image: "/comingSoonPage/carrouselLogos/kiri.png",
    alt: "Kiri",
    link: "https://kiriam.es/",
  },

  // --- Nuevos logos añadidos desde la carpeta ---
  {
    id: "aena",
    image: "/comingSoonPage/carrouselLogos/aena.png",
    alt: "Aena",
    link: "https://www.aena.es/es/pasajeros/pasajeros.html",
  },
  {
    id: "agruppa",
    image: "/comingSoonPage/carrouselLogos/agruppa.png",
    alt: "Agruppa",
    link: "https://www.agruppa.net/",
  },
  {
    id: "alfareal",
    image: "/comingSoonPage/carrouselLogos/alfareal.png",
    alt: "Alfareal",
    link: "https://www.harmonices.es/",
  },
  /* {
    id: "amara-oasis",
    image: "/comingSoonPage/carrouselLogos/amara-oasis.png",
    alt: "Amara Oasis",
    link: "https://thaithreeseasons.com/en?srsltid=AfmBOoprH9xUsra0AAN-lb6_UngDvAKnRoY6m0UVfFUulCW691p9CzaL",
  }, */
  {
    id: "boca-juniors",
    image: "/comingSoonPage/carrouselLogos/boca-juniors.png",
    alt: "Boca Juniors",
    link: "https://www.bocajuniors.com.ar/",
  },
  /* {
    id: "bstadium",
    image: "/comingSoonPage/carrouselLogos/bstadium.png",
    alt: "Bstadium",
    link: "https://bstadium.es/",
  }, */
  {
    id: "burgerjazz",
    image: "/comingSoonPage/carrouselLogos/burgerjazz.png",
    alt: "Burgerjazz",
    link: "https://www.burgerjazz.com/",
  },
  {
    id: "carmen-navarro",
    image: "/comingSoonPage/carrouselLogos/carmen-navarro.png",
    alt: "Carmen Navarro",
    link: "https://carmennavarro.com",
  },
  {
    id: "carso",
    image: "/comingSoonPage/carrouselLogos/carso.png",
    alt: "Carso",
    link: "https://www.carso.com.mx/",
  },
  {
    id: "casa-chamberi",
    image: "/comingSoonPage/carrouselLogos/casa-chamberi.png",
    alt: "Casa Chamberi",
    link: "https://casachamberi.com",
  },
  {
    id: "casa-de-alba",
    image: "/comingSoonPage/carrouselLogos/casa-de-alba.png",
    alt: "Casa De Alba",
    link: "https://www.fundacioncasadealba.com/", // O www.fundacioncasadealba.com dependiendo de la rama
  },
  {
    id: "cayumas",
    image: "/comingSoonPage/carrouselLogos/cayumas.png",
    alt: "Cayumas",
    link: "https://cayumas.com",
  },
  {
    id: "csd",
    image: "/comingSoonPage/carrouselLogos/csd.png",
    alt: "CSD",
    link: "https://www.csd.gob.es",
  },
  {
    id: "dem",
    image: "/comingSoonPage/carrouselLogos/dem.png",
    alt: "Dem",
    link: "https://dehesaelmilagro.com/", // Demasiado genérico (¿Dem Consulting? ¿Dem Studio?).
  },
  {
    id: "dkf",
    image: "/comingSoonPage/carrouselLogos/dkf.png",
    alt: "DKF",
    link: "https://clinicadkf.com",
  },
  {
    id: "greta-salad-bar",
    image: "/comingSoonPage/carrouselLogos/greta-salad-bar.png",
    alt: "Greta Salad Bar",
    link: "https://gretasaladbar.com",
  },
  {
    id: "grupo-el-rincon",
    image: "/comingSoonPage/carrouselLogos/grupo-el-rincon.png",
    alt: "Grupo El Rincon",
    link: "https://www.elrincon.es",
  },
  {
    id: "gvre",
    image: "/comingSoonPage/carrouselLogos/gvre.png",
    alt: "GVRE",
    link: "https://gvre.es/", // ¿Global Vision Real Estate? Mejor verificar.
  },
  {
    id: "hifas-da-terra",
    image: "/comingSoonPage/carrouselLogos/hifas-da-terra.png",
    alt: "Hifas Da Terra",
    link: "https://hifasdaterra.com",
  },
  {
    id: "idealista",
    image: "/comingSoonPage/carrouselLogos/idealista.png",
    alt: "Idealista",
    link: "https://www.idealista.com",
  },
  {
    id: "imeriti",
    image: "/comingSoonPage/carrouselLogos/imeriti.png",
    alt: "Imeriti",
    link: "https://imereti.es/",
  },
  {
    id: "keiko",
    image: "/comingSoonPage/carrouselLogos/keiko.png",
    alt: "Keiko",
    link: "https://www.keikofusion.com/", // Hay restaurantes y marcas, verificar la correcta.
  },
  /*  {
    id: "kilbourne",
    image: "/comingSoonPage/carrouselLogos/kilbourne.png",
    alt: "Kilbourne",
    link: "https://kilbournegroup.com",
  }, */
  {
    id: "la-joya",
    image: "/comingSoonPage/carrouselLogos/la-joya.png",
    alt: "La Joya",
    link: "https://lajoyaproducciones.com",
  },
  {
    id: "lalala",
    image: "/comingSoonPage/carrouselLogos/lalala.png",
    alt: "Lalala",
    link: "https://grupolalala.com/",
  },
  {
    id: "lalupita",
    image: "/comingSoonPage/carrouselLogos/lalupita.png",
    alt: "Lalupita",
    link: "https://www.lalupita.es/",
  },
  {
    id: "lucas-vidal",
    image: "/comingSoonPage/carrouselLogos/lucas-vidal.png",
    alt: "Lucas Vidal",
    link: "https://www.lucasvidal.com/",
  },
  {
    id: "magoni",
    image: "/comingSoonPage/carrouselLogos/magoni.png",
    alt: "Magoni",
    link: "https://www.magoni.co/",
  },
  {
    id: "maxiloteam",
    image: "/comingSoonPage/carrouselLogos/maxiloteam.png",
    alt: "Maxiloteam",
    link: "https://www.maxiloteam.com/",
  },
  {
    id: "metodo-r",
    image: "/comingSoonPage/carrouselLogos/metodo-r.png",
    alt: "Metodo R",
    link: "https://metodo-r.com/",
  },
  {
    id: "mrgo",
    image: "/comingSoonPage/carrouselLogos/mrgo.png",
    alt: "Mrgo",
    link: "https://mrgo-cdef92.webflow.io/",
  },
  {
    id: "nutnut",
    image: "/comingSoonPage/carrouselLogos/nutnut.png",
    alt: "Nutnut",
    link: "https://www.nutnutshop.com/",
  },
  {
    id: "optimum",
    image: "/comingSoonPage/carrouselLogos/optimum.png",
    alt: "Optimum",
    link: "https://youroptimum.com/",
  },
  {
    id: "peterhousepartners",
    image: "/comingSoonPage/carrouselLogos/peterhousepartners.png",
    alt: "Peterhousepartners",
    link: "https://peterhousepartners.com",
  },
  {
    id: "sevilla",
    image: "/comingSoonPage/carrouselLogos/sevilla.png",
    alt: "Sevilla",
    link: "https://sevillafc.es",
  },
  {
    id: "spherika",
    image: "/comingSoonPage/carrouselLogos/spherika.png",
    alt: "Spherika",
    link: "https://caviarspherika.com/",
  },
  {
    id: "tasafy",
    image: "/comingSoonPage/carrouselLogos/tasafy.png",
    alt: "Tasafy",
    link: "https://www.tasafy.com/?gad_source=1&gad_campaignid=21179744081&gbraid=0AAAAAofdEWInnjXDCkKyXo0ii0wVsUK8Y&gclid=CjwKCAjwqazPBhALEiwAOuXqdLOOeKQnVg389zriwt5kZ-Lm6k10awCxWJYj6e7S1hAIDbx0wHCsrBoCzoEQAvD_BwE",
  },
  {
    id: "tc",
    image: "/comingSoonPage/carrouselLogos/tc.png",
    alt: "TC",
    link: "https://tccollection.es/", // Demasiado genérico.
  },
  {
    id: "telmex",
    image: "/comingSoonPage/carrouselLogos/telmex.png",
    alt: "Telmex",
    link: "https://telmex.com/",
  },
  /*  {
    id: "trees-coliving",
    image: "/comingSoonPage/carrouselLogos/trees-coliving.png",
    alt: "Trees Coliving",
    link: "https://treescoliving.com",
  }, */
  {
    id: "viandas",
    image: "/comingSoonPage/carrouselLogos/viandas.png",
    alt: "Viandas",
    link: "https://viandasstores.com/es/",
  },
  {
    id: "vivla",
    image: "/comingSoonPage/carrouselLogos/vivla.png",
    alt: "Vivla",
    link: "https://ads.vivla.com/",
  },
  /*  {
    id: "zagal-1200",
    image: "/comingSoonPage/carrouselLogos/zagal-1200.png",
    alt: "Zagal 1200",
    link: "https://zagal1200-19fcba1334ba24c469355248a8b62.webflow.io/", // Finca o viñedo específico, mejor confirmar la URL exacta.
  }, */
];

export default function ComingSoonLogosCarousel({ speed = 60 }) {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const [trackHalfWidth, setTrackHalfWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    if (!trackRef.current) return;
    const measure = () => {
      if (trackRef.current) {
        setTrackHalfWidth(trackRef.current.scrollWidth / 2);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [logos]);

  useAnimationFrame((_, delta) => {
    if (isPaused || isDraggingRef.current || trackHalfWidth === 0) return;
    const moveBy = -(delta / 1000) * speed;
    let next = x.get() + moveBy;
    if (next <= -trackHalfWidth) next += trackHalfWidth;
    if (next > 0) next -= trackHalfWidth;
    x.set(next);
  });

  if (!logos.length) return null;

  const doubled = [...logos, ...logos];

  return (
    <div
      className="relative w-full select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        drag="x"
        dragMomentum={false}
        dragConstraints={{ left: -Infinity, right: Infinity }}
        onDragStart={() => {
          isDraggingRef.current = true;
          hasDraggedRef.current = false;
        }}
        onDrag={(_, info) => {
          if (Math.abs(info.offset.x) > 5) hasDraggedRef.current = true;
          const current = x.get();
          if (trackHalfWidth > 0) {
            if (current <= -trackHalfWidth) x.set(current + trackHalfWidth);
            if (current > 0) x.set(current - trackHalfWidth);
          }
        }}
        onDragEnd={() => {
          isDraggingRef.current = false;
        }}
        // Restauramos el gap-8 y md:gap-14 para que respiren al ser más grandes
        className="flex w-max cursor-grab items-center gap-8 px-4 active:cursor-grabbing md:gap-14 md:px-8"
      >
        {doubled.map((item, i) => {
          const content = (
            // 1. Aumentamos h y w.
            // Móvil: h-14 w-32 (antes 10 y 24)
            // Desktop: md:h-20 md:w-48 (antes 14 y 36)
            <div className="relative h-28 w-28 shrink-0 opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:h-48 md:w-72 lg:h-40 lg:w-48">
              <img
                src={item.image}
                alt={item.alt || "Logo"}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
            </div>
          );
          return item.link ? (
            <a
              key={`${item.id ?? i}-${i}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onDragStart={(e) => e.preventDefault()}
              onClickCapture={(e) => {
                if (hasDraggedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  hasDraggedRef.current = false;
                }
              }}
            >
              {content}
            </a>
          ) : (
            <div key={`${item.id ?? i}-${i}`}>{content}</div>
          );
        })}
      </motion.div>
    </div>
  );
}
