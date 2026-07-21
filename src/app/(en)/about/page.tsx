import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">About PlayFree Games</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            Our Mission
          </h2>
          <p>
            PlayFree Games is dedicated to providing the best free online gaming
            experience. We believe games should be accessible to everyone — no
            downloads, no installations, no sign-ups required. Just click and
            play!
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            What We Offer
          </h2>
          <p>
            Our platform hosts hundreds of HTML5 games across multiple
            categories including action, puzzle, arcade, racing, sports, and
            more. All games run directly in your browser on any device —
            desktop, tablet, or mobile.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            For Game Developers
          </h2>
          <p>
            Are you a game developer looking to reach a wider audience? We
            welcome submissions from indie developers and studios. Your games
            can reach millions of players worldwide through our platform.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">Contact Us</h2>
          <p>
            General inquiries: info@playfreegames.com
            <br />
            Game submissions: developers@playfreegames.com
            <br />
            Advertising: ads@playfreegames.com
          </p>
        </section>
      </div>
    </div>
  );
}
