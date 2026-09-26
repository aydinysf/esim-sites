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
            <span>LIVE · DEKKING BELGIË</span>
          </div>

          <h1>
            Verbind jezelf, <br />
            <span className="gradient-text">voordat je landt.</span>
          </h1>

          <p className="lead">{subheadline || "Prepaid eSIM voor België zonder contracten en zonder roamingkosten. QR-code direct per e-mail — actief voor je koffer er is."}</p>

          <div className="check">
            <label htmlFor="dev">Ondersteunt jouw telefoon eSIM?</label>
            <div className="row">
              <select id="dev" onChange={handleDeviceChange}>
                <option value="">Gerät wählen</option>
                <option value="1">iPhone XS / XR oder neuer</option>
                <option value="1">Samsung Galaxy S20 oder neuer</option>
                <option value="1">Google Pixel 3 oder neuer</option>
                <option value="0">Anderes Gerät</option>
              </select>
              <a className="btn-gradient" href={ctaHref || "#tarife"}>
                {ctaText || "Toon tarieven"}
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
              <span className="font-mono text-xs text-[var(--c5)]">● Actief in Brussel</span>
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
          <span><span style={{ color: "var(--c4)" }}>SIGNAL::</span> BRUSSEL ✦ ANTWERPEN ✦ GENT ✦ BRUGGE ✦ LEUVEN ✦ NAMEN ✦ LUIK ✦ BRUSSEL ✦ ANTWERPEN ✦ GENT ✦ BRUGGE ✦ LEUVEN ✦ NAMEN ✦ LUIK</span>
          <span><span style={{ color: "var(--c4)" }}>SIGNAL::</span> BRUSSEL ✦ ANTWERPEN ✦ GENT ✦ BRUGGE ✦ LEUVEN ✦ NAMEN ✦ LUIK ✦ BRUSSEL ✦ ANTWERPEN ✦ GENT ✦ BRUGGE ✦ LEUVEN ✦ NAMEN ✦ LUIK</span>
        </div>
      </div>
    </>
  );
}
