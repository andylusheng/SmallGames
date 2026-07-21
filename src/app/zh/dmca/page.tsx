import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA Policy",
};

export default function DmcaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">DMCA Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: January 2024</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-300">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            Digital Millennium Copyright Act
          </h2>
          <p>
            We respect the intellectual property rights of others. If you
            believe that your copyrighted work has been infringed upon, please
            send us a DMCA takedown notice.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            Filing a DMCA Notice
          </h2>
          <p>Your DMCA notice must include:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              A description of the copyrighted work you claim has been infringed
            </li>
            <li>
              The URL or location of the allegedly infringing material
            </li>
            <li>Your contact information (name, address, email)</li>
            <li>
              A statement that you have a good faith belief that the use is not
              authorized
            </li>
            <li>
              A statement that the information in the notice is accurate, under
              penalty of perjury
            </li>
            <li>Your physical or electronic signature</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">
            Counter-Notice
          </h2>
          <p>
            If you believe your content was removed by mistake, you may file a
            counter-notice with the same information plus a statement of consent
            to jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-white">Contact</h2>
          <p>
            Send DMCA notices to: dmca@zeroplaygames.com
            <br />
            We will respond to valid notices within 48 hours.
          </p>
        </section>
      </div>
    </div>
  );
}
