import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB) | PoloSim Pilipinas",
  description: "Allgemeine Geschäftsbedingungen für die Nutzung von PoloSim Pilipinas eSIM Datendiensten.",
};

export default function AgbPage() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold mb-6">Allgemeine Geschäftsbedingungen (AGB)</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed font-sans">
        <h2 className="text-xl font-bold text-white mt-6 mb-2">1. Geltungsbereich</h2>
        <p>Diese AGB gelten für alle Verträge über die Bereitstellung von digitalen eSIM-Datenpaketen zwischen PoloSim und dem Kunden.</p>
        <h2 className="text-xl font-bold text-white mt-6 mb-2">2. Vertragsabschluss & Bereitstellung</h2>
        <p>Der Vertrag kommt mit Abschluss der Online-Bestellung zustande. Die Bereitstellung erfolgt digital per E-Mail in Form eines QR-Codes unmittelbar nach Zahlungseingang.</p>
        <h2 className="text-xl font-bold text-white mt-6 mb-2">3. Leistungsumfang & Fair Use</h2>
        <p>PoloSim stellt mobile Datendienste im Zielland zur Verfügung. Unbegrenzte Tarife unterliegen der Fair-Use-Policy des jeweiligen Netzwerkbetreibers.</p>
      </div>
    </div>
  );
}
