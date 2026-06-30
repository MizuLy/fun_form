import React, { useRef } from "react";
import { toPng } from "html-to-image";

export default function Receipt({ data }) {
  const receiptRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `permission-slip-${data.code}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    }
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Permission-Slip-${data.code}`;
    window.print();
    document.title = originalTitle; // restore after
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 gap-4">
      <div
        ref={receiptRef}
        id="receipt"
        className="border-2 border-double border-zinc-800 bg-white text-black w-full max-w-[800px] aspect-[210/297] p-16 flex flex-col"
      >
        {/* Letterhead */}
        <div className="flex justify-between items-start border-b border-zinc-300 pb-6 mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase">
              Department of
            </p>
            <h1 className="text-2xl tracking-[0.15em] uppercase font-medium mt-1">
              Personal Affairs &amp; Excuses
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-widest text-zinc-400 uppercase">
              Form 1-A
            </p>
            <p className="text-[10px] tracking-widest text-zinc-400 uppercase">
              Est. Today
            </p>
          </div>
        </div>

        <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase mb-2">
          Official Permission Slip
        </p>
        <p className="text-sm text-zinc-500 italic mb-12">
          This document certifies that the absence described below is,
          allegedly, legitimate.
        </p>

        {/* Body */}
        <div className="space-y-8 text-base flex-1">
          <div className="flex justify-between border-b border-dotted border-zinc-300 pb-3">
            <span className="text-zinc-400 uppercase text-xs tracking-widest">
              Applicant
            </span>
            <span className="font-medium text-lg">{data.name}</span>
          </div>

          <div className="border-b border-dotted border-zinc-300 pb-3">
            <p className="text-zinc-400 uppercase text-xs tracking-widest mb-2">
              Stated Reason
            </p>
            <p className="text-zinc-700 leading-relaxed text-lg">
              {data.reason}
            </p>
            <p className="text-xs text-zinc-400 italic mt-2">
              Reviewed and found reasonably believable.
            </p>
          </div>

          <div className="flex justify-between border-b border-dotted border-zinc-300 pb-3">
            <div>
              <p className="text-zinc-400 uppercase text-xs tracking-widest">
                Leave Date
              </p>
              <p className="font-medium text-lg">
                {new Date(data.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-zinc-400 uppercase text-xs tracking-widest">
                Due Date
              </p>
              <p className="font-medium text-lg">
                {new Date(data.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400 uppercase text-xs tracking-widest">
              Permission Code
            </span>
            <span className="font-mono tracking-widest text-lg">
              {data.code}
            </span>
          </div>
        </div>

        {/* Seal + signature */}
        <div className="flex justify-between items-end mt-12 pt-8 border-t border-zinc-300">
          <div>
            <p className="text-lg italic text-zinc-500 font-serif">
              Self-Approved
            </p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
              Authorized Signature
            </p>
          </div>
          <div className="w-24 h-24 shrink-0 rounded-full border-2 border-zinc-300 flex items-center justify-center rotate-[-12deg]">
            <p className="text-[9px] text-zinc-400 uppercase tracking-tighter text-center leading-tight">
              Notarized
              <br />
              by Vibes
            </p>
          </div>
        </div>

        <p className="text-center text-[9px] text-zinc-300 tracking-[0.2em] uppercase mt-8">
          Void if questioned too closely
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
