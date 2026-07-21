import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: January 2024</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by these Terms of Service. If you do not agree, please do not
            use our services.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            2. Use of Service
          </h2>
          <p>
            Our games are provided free of charge for personal, non-commercial
            entertainment purposes. You agree not to misuse the service,
            including but not limited to: attempting to disrupt the service,
            using automated tools to access the service, or redistributing game
            content without permission.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            3. Intellectual Property
          </h2>
          <p>
            All games, graphics, and content on this website are the property of
            their respective owners. Games are provided by third-party
            developers and are subject to their own terms and licenses.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            4. Disclaimer of Warranties
          </h2>
          <p>
            The service is provided &quot;as is&quot; without warranties of any
            kind. We do not guarantee that the service will be uninterrupted,
            error-free, or free of harmful components.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            5. Limitation of Liability
          </h2>
          <p>
            We shall not be liable for any indirect, incidental, special, or
            consequential damages arising from your use of the service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the service after changes constitutes acceptance of the
            updated terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            7. Contact
          </h2>
          <p>
            For questions about these terms, contact us at:
            legal@playfreegames.com
          </p>
        </section>
      </div>
    </div>
  );
}
