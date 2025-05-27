import Link from 'next/link';
import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="px-4 py-10 md:px-16 lg:px-32 xl:px-48 text-white mt-[100px]">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-[#0067FF]">Terms and Conditions</h1>
      <p className="text-xs md:text-sm text-gray-400 text-center mb-10">Last updated: May 26, 2025</p>

      <section className="space-y-6 ml-2 md:ml-4 text-sm md:text-base">
        <p>Please read these terms and conditions carefully before using Our Service.</p>

        <h2 className="text-xl md:text-2xl font-semibold">Interpretation and Definitions</h2>

        <h3 className="text-lg md:text-xl font-medium">Interpretation</h3>
        <p>
          The words of which the initial letter is capitalized have meanings defined under the following conditions.
          The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </p>

        <h3 className="text-lg md:text-xl font-medium">Definitions</h3>
        <p>For the purposes of these Terms and Conditions:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party...</li>
          <li><strong>Country</strong> refers to: Pakistan</li>
          <li><strong>Company</strong> refers to BackupDoc.</li>
          <li><strong>Device</strong> means any device that can access the Service...</li>
          <li><strong>Service</strong> refers to the Website.</li>
          <li><strong>Terms and Conditions</strong> ...</li>
          <li><strong>Third-party Social Media Service</strong> ...</li>
          <li><strong>Website</strong> refers to BackupDoc, accessible from www.backupdoc.com</li>
          <li><strong>You</strong> means the individual accessing or using the Service...</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-semibold">Acknowledgment</h2>
        <p>These are the Terms and Conditions governing the use of this Service...</p>

        <h2 className="text-xl md:text-2xl font-semibold">Links to Other Websites</h2>
        <p>Our Service may contain links to third-party websites...</p>

        <h2 className="text-xl md:text-2xl font-semibold">Termination</h2>
        <p>We may terminate or suspend Your access immediately, without prior notice...</p>

        <h2 className="text-xl md:text-2xl font-semibold">Limitation of Liability</h2>
        <p>Notwithstanding any damages that You might incur, the entire liability of the Company...</p>

        <h2 className="text-xl md:text-2xl font-semibold">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
        <p>
          The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind...
        </p>

        <h2 className="text-xl md:text-2xl font-semibold">Governing Law</h2>
        <p>
          The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service...
        </p>

        <h2 className="text-xl md:text-2xl font-semibold">Disputes Resolution</h2>
        <p>
          If You have any concern or dispute about the Service, You agree to first try to resolve it informally by contacting the Company.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold">For European Union (EU) Users</h2>
        <p>
          If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold">United States Legal Compliance</h2>
        <p>
          You represent and warrant that You are not located in a country subject to U.S. embargo or on any U.S. government list of prohibited or restricted parties.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold">Severability and Waiver</h2>

        <h3 className="text-lg md:text-xl font-medium">Severability</h3>
        <p>
          If any provision of these Terms is held to be unenforceable or invalid, that provision will be changed to accomplish its objectives...
        </p>

        <h3 className="text-lg md:text-xl font-medium">Waiver</h3>
        <p>
          Failure to exercise a right or require performance of an obligation under these Terms does not affect a party's ability to exercise such right or require such performance later.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold">Translation Interpretation</h2>
        <p>
          These Terms and Conditions may have been translated. You agree that the original English text shall prevail in the case of a dispute.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold">Changes to These Terms and Conditions</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. Material changes will be notified 30 days in advance...
        </p>

        <h2 className="text-xl md:text-2xl font-semibold">Contact Us</h2>
        <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
        <ul className="list-disc list-inside">
          <li>
            By email: <Link href="mailto:tahirunity786@gmail.com" className="text-[#0067FF] underline">tahirunity786@gmail.com</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
