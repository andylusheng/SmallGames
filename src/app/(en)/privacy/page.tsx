import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: January 2024</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            1. Information We Collect
          </h2>
          <p>
            We collect minimal information to provide our services. This
            includes anonymous usage data through cookies and analytics tools to
            improve your gaming experience.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            2. Cookies and Advertising
          </h2>
          <p>
            We use Google AdSense to display advertisements. Third-party
            vendors, including Google, use cookies to serve ads based on your
            prior visits to this and other websites. You can opt out of
            personalized advertising by visiting Google&apos;s Ads Settings.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            3. Third-Party Services
          </h2>
          <p>
            Our games may be provided by third-party developers. These services
            have their own privacy policies, and we encourage you to review
            them.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            4. Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your
            information. However, no method of transmission over the Internet is
            100% secure.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            5. Children&apos;s Privacy
          </h2>
          <p>
            Our service is not directed to children under 13. We do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            6. GDPR Rights
          </h2>
          <p>
            If you are in the European Economic Area (EEA), you have the right
            to access, correct, delete, or restrict processing of your personal
            data. Contact us to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            7. Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at: privacy@zeroplaygames.com
          </p>
        </section>
      </div>
    </div>
  );
}
