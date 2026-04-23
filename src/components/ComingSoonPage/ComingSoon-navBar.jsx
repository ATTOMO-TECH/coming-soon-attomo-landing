import ComingSoonNavBarButton from "./ComingSoon-navBarButton";

export default function ComingSoonNavBar() {
  const onContactClick = () => {
    window.dispatchEvent(new CustomEvent("attomo:contact-click"));
  };

  return (
    <nav className="relative z-20 flex w-full items-center justify-between bg-transparent px-4 py-3 md:px-8 md:py-5">
      <ComingSoonNavBarButton
        href="https://www.instagram.com/attomo.digital/"
        label="Instagram"
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="12"
          viewBox="0 0 107 18"
          fill="none"
        >
          <path
            d="M5.68167 0.389648L0 17.1823H2.98777L3.62451 15.0282H10.0899L10.7266 17.1823H13.7144L8.08168 0.389648H5.68167ZM4.35921 12.5802L6.85718 4.25735L9.35516 12.5802H4.35921Z"
            fill="#F1F1F1"
          />
          <path
            d="M31.3008 2.98443H36.1498V17.1823H38.9416V2.98443H43.8396V0.389648H31.3008V2.98443Z"
            fill="#F1F1F1"
          />
          <path
            d="M14.9414 2.98443H19.7904V17.1823H22.5823V2.98443H27.4803V0.389648H14.9414V2.98443Z"
            fill="#F1F1F1"
          />
          <path
            d="M97.521 0C92.0842 0 88.8516 4.01457 88.8516 8.81248C88.8516 13.6104 92.0842 17.625 97.521 17.625C102.958 17.625 106.19 13.6104 106.19 8.81248C106.19 4.01457 102.958 0 97.521 0ZM97.521 15.1281C93.7985 15.1281 91.6924 12.2885 91.7414 8.81248C91.7414 5.33645 93.7985 2.49687 97.521 2.49687C101.243 2.49687 103.35 5.33645 103.301 8.81248C103.301 12.2885 101.243 15.1281 97.521 15.1281Z"
            fill="#F1F1F1"
          />
          <path
            d="M55.2515 0C49.8147 0 46.582 4.01457 46.582 8.81248C46.582 13.6104 49.8147 17.625 55.2515 17.625C60.6882 17.625 63.9209 13.6104 63.9209 8.81248C63.9209 4.01457 60.6882 0 55.2515 0Z"
            fill="#F1F1F1"
          />
          <path
            d="M76.4056 13.2657L71.0178 0.389648H68.4219V17.1823H71.0178V5.97089L75.377 17.1823H77.4342L81.7444 6.0688V17.1823H84.3893V0.389648H81.7444L76.4056 13.2657Z"
            fill="#F1F1F1"
          />
        </svg>
      </div>

      <ComingSoonNavBarButton
        href="#contact"
        label="Contacto"
        external={false}
        onClick={onContactClick}
      />
    </nav>
  );
}
