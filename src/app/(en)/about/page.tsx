export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">About ZeroPlay Games</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">Our Mission</h2>
          <p>
            ZeroPlay Games provides lightweight browser games that start without an
            account or installation. Our goal is to make short, original games easy
            to discover and play on the web.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">What We Offer</h2>
          <p>
            The catalog currently contains more than 100 HTML5 games across action,
            puzzle, arcade, racing, sports, strategy, casual, and other categories.
            Device and control support can vary by game, so each title is reviewed
            individually as the catalog is improved.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">Contact</h2>
          <p>
            General inquiries: info@zeroplaygames.com
            <br />
            Game submissions: developers@zeroplaygames.com
            <br />
            Advertising: ads@zeroplaygames.com
          </p>
        </section>
      </div>
    </div>
  );
}
