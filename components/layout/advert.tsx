const Advert = () => {
  return (
    <section className="border-t border-b">
      <img
        className="mx-auto"
        src="/images/ad-banner.png"
        width={1200}
        height={250}
        alt="Advert"
      />

      <span className="sr-only">Site Ad Banner</span>
    </section>
  );
};

export default Advert;
