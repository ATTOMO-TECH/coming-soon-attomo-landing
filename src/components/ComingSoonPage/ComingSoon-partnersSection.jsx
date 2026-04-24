import ComingSoonPartnerCard from "./ComingSoon-partnerCard";

const partners = [
  {
    id: "webflow",
    image: "/comingSoonPage/webflow-1.png",
    alt: "Webflow Certified Partner",
    link: "https://webflow.com/",
  },
  {
    id: "shopify",
    image: "/comingSoonPage/shopify-1.png",
    alt: "Shopify Experts",
    link: "https://www.shopify.com/partners",
  },
  {
    id: "hubspot",
    image: "/comingSoonPage/hubspot-1.png",
    alt: "HubSpot Certified Partner",
    link: "https://www.hubspot.com/partners",
  },
  {
    id: "klaviyo",
    image: "/comingSoonPage/klaviyo-1.png",
    alt: "Klaviyo Partner",
    link: "https://www.klaviyo.com/partners",
  },
];

export default function ComingSoonPartnersSection() {
  if (!partners.length) return null;

  return (
    <section className="w-full shrink-0 bg-[#f1f1f1] pt-4 max-h-[20vh] md:pt-4 md:max-h-[22vh] lg:pt-4 lg:max-h-[13vh]">
      <div className="mx-auto flex max-w-5xl flex-nowrap items-center justify-center gap-2 px-2 md:gap-6 md:px-8">
        {partners.map((p, i) => (
          <ComingSoonPartnerCard
            key={p.id ?? i}
            image={p.image}
            alt={p.alt}
            link={p.link}
          />
        ))}
      </div>
    </section>
  );
}
