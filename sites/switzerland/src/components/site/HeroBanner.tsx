"use client";
import React, { useState } from "react";

export default function HeroBanner() {
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
          <h1>Ankommen, scannen, online sein.</h1>
          <p className="lead">Prepaid-eSIM für die Schweiz ohne Vertrag und ohne Roaming-Gebühren. Der QR-Code kommt sofort per E-Mail.</p>
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
              <a className="btn" href="#tarife">Tarife ansehen</a>
            </div>
            <p id="res">{deviceResult}</p>
          </div>
        </div>

        <div className="phone" aria-hidden="true">
          <div className="screen">
            <small>eSIM aktiv</small>
            <div className="bars">
              <i style={{ height: "8px" }}></i>
              <i style={{ height: "14px" }}></i>
              <i style={{ height: "20px" }}></i>
              <i style={{ height: "26px" }}></i>
            </div>
            <b>Basel · 4G/5G</b>
            <div className="meter">
              <span style={{ width: "34%" }}></span>
            </div>
            <small>3,4 GB verbraucht</small>
          </div>
        </div>
      </div>

      <svg className="ridge" viewBox="0 0 1080 200" role="img" aria-label="Panorama">
        <path d="M0 200V110l90-50 70 40 90-70 100 80 80-40 120 70 90-60 110 60 130-70 120 80 80-40V200z" fill="var(--r1)" />
        <path d="M0 200V150l120-40 90 30 110-60 100 70 120-50 130 60 110-40 140 50 150-30V200z" fill="var(--r2)" />
        <g fill="var(--red)">
          <circle cx="150" cy="128" r="6" />
          <circle cx="420" cy="120" r="6" />
          <circle cx="700" cy="128" r="6" />
          <circle cx="960" cy="142" r="6" />
        </g>
        <g>
          <text x="128" y="172">Zürich</text>
          <text x="398" y="164">Genf</text>
          <text x="694" y="172">Basel</text>
          <text x="940" y="186">Bern</text>
        </g>
      </svg>
    </>
  );
}
