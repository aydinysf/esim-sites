"use client";
import React from "react";

export default function SinekGamePage() {
  return (
    <div className="w-full h-screen fixed inset-0 z-50 bg-black overflow-hidden">
      <iframe
        src="/sinek.html"
        className="w-full h-full border-0"
        title="SİNEK — Prototype v0.1"
      />
    </div>
  );
}
