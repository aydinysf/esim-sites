import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | PoloSim Österreich",
  description: "Datenschutzerklärung und Schutz Ihrer persönlichen Daten bei PoloSim Österreich.",
};

export default function DatenschutzPage() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold mb-6">Datenschutzerklärung (DSGVO)</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed font-sans">
        <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO).</p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">Datenerfassung auf unserer Website</h2>
        <p>Die Datennutzung erfolgt ausschließlich zur Erfüllung und Abwicklung der eSIM-Bestellung (z.B. E-Mail-Adresse für die QR-Code-Zustellung und Zahlungsabwicklung).</p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">Zahlungsdienstleister</h2>
        <p>Alle Zahlungen werden über verschlüsselte Schnittstellen (PCI-DSS zertifiziert) abgewickelt. Es werden keine Kreditkartendaten auf unseren Servern gespeichert.</p>
        <h2 className="text-xl font-bold text-white mt-8 mb-2">Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf kostenlose Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.</p>
      </div>
    </div>
  );
}
