import React, { useRef } from "react";
import { toPng } from "html-to-image";

export default function CertificateReceipt({ data }) {
  const receiptRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#ffffff",
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
    <div className="min-h-screen flex flex-col justify-center items-center p-6 gap-4 bg-black">
      <div
        ref={receiptRef}
        id="receipt"
        className="border-2 border-double border-zinc-300 bg-white text-black w-full max-w-[800px] aspect-[210/297] p-16 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-200 pb-6 mb-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
              Office of Academic Achievements
            </p>
            <h1 className="text-2xl tracking-[0.15em] uppercase font-medium mt-1">
              Certificate of Completion
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-widest text-zinc-400 uppercase">
              Form 2-B
            </p>
            <p className="text-[10px] tracking-widest text-zinc-400 uppercase">
              Est. Today
            </p>
          </div>
        </div>

        <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase mb-2">
          This is to certify that
        </p>

        {/* Recipient */}
        <div className="flex-1 flex flex-col justify-center gap-8">
          <div className="text-center border-b border-dotted border-zinc-300 pb-6">
            <h2 className="text-4xl font-medium tracking-wide text-zinc-800 font-serif">
              {data.name}
            </h2>
            <p className="text-xs text-zinc-400 italic mt-2">
              has allegedly, and with great effort, completed the following
            </p>
          </div>

          <div className="border-b border-dotted border-zinc-300 pb-6">
            <p className="text-zinc-400 uppercase text-xs tracking-widest mb-2">
              Achievement
            </p>
            <p className="text-zinc-700 leading-relaxed text-lg">
              {data.achievement}
            </p>
            <p className="text-xs text-zinc-400 italic mt-2">
              Performance reviewed and deemed satisfactory by an unbiased party.
            </p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-zinc-400 uppercase text-xs tracking-widest mb-1">
                Issued by
              </p>
              <p className="font-medium text-lg">{data.issuedBy}</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-400 uppercase text-xs tracking-widest mb-1">
                Date
              </p>
              <p className="font-medium text-lg">
                {new Date(data.issuedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-8 pt-6 border-t border-zinc-200">
          <div>
            <p className="text-lg italic text-zinc-500 font-serif">
              Self-Endorsed
            </p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
              Authorized Signature
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-zinc-400">
              {data.code}
            </p>
          </div>
          <div className="w-20 h-20 shrink-0 rounded-full border-2 border-zinc-200 flex items-center justify-center rotate-[-12deg]">
            <p className="text-[8px] text-zinc-400 uppercase tracking-tighter text-center leading-tight">
              Certified
              <br />
              by Vibes
            </p>
          </div>
        </div>

        <p className="text-center text-[9px] text-zinc-300 tracking-[0.2em] uppercase mt-6">
          This certificate is legally binding in no jurisdiction whatsoever
        </p>
      </div>

      <div className="print:hidden flex gap-3">
        <button
          onClick={handlePrint}
          className="bg-white text-black text-xs tracking-[0.2em] uppercase py-3 px-6 rounded-md"
        >
          Save as PDF
        </button>
        <button
          onClick={handleDownloadImage}
          className="bg-zinc-800 text-white text-xs tracking-[0.2em] uppercase py-3 px-6 rounded-md"
        >
          Save as Image
        </button>
      </div>
    </div>
  );
}
