"use client";
import React, { useState } from "react";

interface Props {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroBanner({ headline, subheadline, ctaText, ctaHref }: Props) {
  const [deviceResult, setDeviceResult] = useState("");

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "1") {
      setDeviceResult("✓ Dein Gerät ist 100% eSIM-kompatibel!");
    } else if (val === "0") {
      setDeviceResult("✕ Dieses Gerät unterstützt evtl. keine eSIM.");
    } else {
      setDeviceResult("");
    }
  };

  return (
    <>
      <div className="hero">
        <div>
          <div className="eyebrow">
            <span className="pulse-dot" />
            <span>LIVE · NETZABDECKUNG ÖSTERREICH</span>
          </div>

          <h1>
            Verbinde dich, <br />
            <span className="gradient-text">bevor du landest.</span>
          </h1>

          <p className="lead">{subheadline || "Prepaid-eSIM für Österreich ohne Vertrag und ohne Roaming-Falle. QR-Code direkt per E-Mail — aktiv, bevor das Gepäckband startet."}</p>

          <div className="check">
            <label htmlFor="dev">Unterstützt dein Handy eSIM?</label>
            <div className="row">
              <select id="dev" onChange={handleDeviceChange}>
                <option value="">Gerät wählen</option>
                <option value="1">iPhone XS / XR oder neuer</option>
                <option value="1">Samsung Galaxy S20 oder neuer</option>
                <option value="1">Google Pixel 3 oder neuer</option>
                <option value="0">Anderes Gerät</option>
              </select>
              <a className="btn-gradient" href={ctaHref || "#tarife"}>
                {ctaText || "Zeig mir die Tarife"}
              </a>
            </div>
            <p id="res">{deviceResult}</p>
          </div>
        </div>

        {/* Right Phone Stage Mockup */}
        <div className="phone-stage">
          <div className="floating-chip chip-top">📶 0 € Roaming</div>
          <div className="floating-chip chip-bottom">⚡ Live in 5 Min.</div>

          <div className="screen">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[var(--soft)]">eSIM · Signal</span>
              <span className="font-mono text-xs text-[var(--c5)]">● Aktiv in Wien</span>
            </div>

            <div className="qr-grid">
              <div className="qr-dot" /><div className="qr-dot" /><div className="qr-dot" /><div className="qr-dot" /><div className="qr-dot" />
              <div className="qr-dot" /><div /><div /><div /><div className="qr-dot" />
              <div className="qr-dot" /><div /><div className="qr-dot" /><div /><div className="qr-dot" />
              <div className="qr-dot" /><div /><div /><div /><div className="qr-dot" />
              <div className="qr-dot" /><div className="qr-dot" /><div className="qr-dot" /><div className="qr-dot" /><div className="qr-dot" />
            </div>

            <div className="text-center font-mono text-xs text-[var(--soft)] tracking-wider">
              SCAN & CONNECT
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Ticker Bar */}
      <div className="ticker-wrap">
        <div className="ticker-move">
          <span><span style={{ color: "var(--c4)" }}>SIGNAL::</span> WIEN ✦ SALZBURG ✦ INNSBRUCK ✦ GRAZ ✦ LINZ ✦ KLAGENFURT ✦ BREGENZ ✦ WIEN ✦ SALZBURG ✦ INNSBRUCK ✦ GRAZ ✦ LINZ ✦ KLAGENFURT ✦ BREGENZ</span>
          <span><span style={{ color: "var(--c4)" }}>SIGNAL::</span> WIEN ✦ SALZBURG ✦ INNSBRUCK ✦ GRAZ ✦ LINZ ✦ KLAGENFURT ✦ BREGENZ ✦ WIEN ✦ SALZBURG ✦ INNSBRUCK ✦ GRAZ ✦ LINZ ✦ KLAGENFURT ✦ BREGENZ</span>
        </div>
      </div>
    </>
  );
}
