import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | PoloSim Việt Nam",
  description: "Rechtliche Informationen und Impressum für PoloSim Việt Nam.",
};

export default function ImpressumPage() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold mb-6">Impressum</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed font-sans">
        <p><strong>Angaben gemäß § 5 TMG / WKO Informationspflicht:</strong></p>
        <p>
          PoloSim Digital Telecommunications Services<br />
          Domain: https://esimcard.vn<br />
          E-Mail: support@polosim.com
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
        </p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung bedürfen der schriftlichen Zustimmung.
        </p>
      </div>
    </div>
  );
}
