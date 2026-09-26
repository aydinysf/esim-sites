import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung | PoloSim España",
  description: "Widerrufsrecht und Stornierungsbedingungen für PoloSim digitale eSIM Produkte.",
};

export default function WiderrufPage() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-extrabold mb-6">Widerrufsbelehrung</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed font-sans">
        <h2 className="text-xl font-bold text-white mt-6 mb-2">Widerrufsrecht</h2>
        <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen, sofern der digitale QR-Code noch nicht aktiviert oder Datenvolumen verbraucht wurde.</p>
        <h2 className="text-xl font-bold text-white mt-6 mb-2">Erlöschen des Widerrufsrechts</h2>
        <p>Das Widerrufsrecht erlischt bei einem Vertrag über die Lieferung von nicht auf einem körperlichen Datenträger befindlichen digitalen Inhalten, wenn wir mit der Ausführung des Vertrages begonnen haben (z.B. Scannen des QR-Codes / Einbuchen ins Mobilfunknetz).</p>
      </div>
    </div>
  );
}
