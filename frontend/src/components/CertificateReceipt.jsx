import React, { useRef } from "react";
import { toPng } from "html-to-image";

export default function CertificateReceipt({ data }) {
  const receiptRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#fafaf8",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `certificate-${data.code}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    }
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Certificate-${data.code}`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 gap-6 bg-zinc-950">
      <div
        ref={receiptRef}
        id="receipt"
        className="relative w-full max-w-[780px] aspect-[210/297] bg-[#fafaf8] text-zinc-900 flex flex-col p-20"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {/* Corner decorations */}
        <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-zinc-300" />
        <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-zinc-300" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-zinc-300" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-zinc-300" />

        {/* Outer border */}
        <div className="absolute inset-8 border border-zinc-200 pointer-events-none" />

        {/* Top label */}
        <div className="text-center mb-10">
          <p className="text-[9px] tracking-[0.5em] text-zinc-400 uppercase mb-3">
            Office of Distinguished Achievements
          </p>
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px flex-1 bg-zinc-300" />
            <p className="text-[8px] tracking-[0.4em] text-zinc-400 uppercase">
              Est. Today
            </p>
            <div className="h-px flex-1 bg-zinc-300" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-normal tracking-widest text-zinc-800 uppercase mb-2"
            style={{ letterSpacing: "0.2em" }}
          >
            Certificate
          </h1>
          <p className="text-sm italic text-zinc-500 tracking-widest">
            of Excellence
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col justify-center text-center gap-8">
          <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase">
            This certifies that
          </p>

          <div>
            <h2
              className="text-5xl font-normal text-zinc-900 mb-3"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
            >
              {data.name}
            </h2>
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px w-16 bg-zinc-300" />
              <div className="w-1 h-1 rounded-full bg-zinc-300" />
              <div className="h-px w-16 bg-zinc-300" />
            </div>
          </div>

          <div className="px-12">
            <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase mb-3">
              has distinguished themselves in
            </p>
            <p className="text-lg text-zinc-700 leading-relaxed italic">
              {data.achievement}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-zinc-200" />
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          <div className="flex justify-between items-end">
            <div className="text-center">
              <p className="text-lg italic text-zinc-700 mb-1">
                {data.issuedBy}
              </p>
              <div className="h-px w-32 bg-zinc-300 mb-1" />
              <p className="text-[9px] tracking-[0.3em] text-zinc-400 uppercase">
                Issuing Authority
              </p>
            </div>

            <div className="w-20 h-20 shrink-0 rounded-full border border-zinc-300 flex items-center justify-center rotate-[-12deg]">
              <p className="text-[7px] text-zinc-400 uppercase tracking-tighter text-center leading-tight">
                Certified
                <br />
                by Vibes
              </p>
            </div>

            <div className="text-center">
              <p className="text-lg text-zinc-700 mb-1">
                {new Date(data.issuedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <div className="h-px w-32 bg-zinc-300 mb-1" />
              <p className="text-[9px] tracking-[0.3em] text-zinc-400 uppercase">
                Date of Issue
              </p>
            </div>
          </div>

          <p className="text-center text-[8px] tracking-[0.3em] text-zinc-300 uppercase mt-8">
            {data.code} · Void if questioned too closely
          </p>
        </div>
      </div>

      <div className="print:hidden flex gap-3">
        <button
          onClick={handlePrint}
          className="bg-white text-black text-xs tracking-[0.2em] uppercase py-3 px-6 rounded-md hover:bg-zinc-100 transition-colors"
        >
          Save as PDF
        </button>
        <button
          onClick={handleDownloadImage}
          className="bg-zinc-800 text-white text-xs tracking-[0.2em] uppercase py-3 px-6 rounded-md hover:bg-zinc-700 transition-colors"
        >
          Save as Image
        </button>
      </div>
    </div>
  );
}
