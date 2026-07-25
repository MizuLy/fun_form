import React, { useRef } from "react";
import { toPng } from "html-to-image";

export default function PermissionReceipt({ data }) {
  const receiptRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#f5f4f0",
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
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 gap-4 bg-zinc-950">
      <div
        ref={receiptRef}
        id="receipt"
        className="border-2 border-double border-zinc-400 w-full max-w-[800px] aspect-[210/297] p-16 flex flex-col"
        style={{ backgroundColor: "#f5f4f0", fontFamily: "Georgia, serif" }}
      >
        {/* Letterhead */}
        <div className="flex justify-between items-start border-b border-zinc-400 pb-6 mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
              Department of
            </p>
            <h1 className="text-3xl tracking-[0.1em] uppercase font-medium mt-1 text-zinc-800">
              Personal Affairs &amp; Excuses
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs tracking-widest text-zinc-500 uppercase">
              Form 1-A
            </p>
            <p className="text-xs tracking-widest text-zinc-500 uppercase">
              Est. Today
            </p>
          </div>
        </div>

        <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-2">
          Official Permission Slip
        </p>
        <p className="text-base text-zinc-600 italic mb-10">
          This document acknowledges, without endorsement, that the individual
          named below has chosen not to attend.
        </p>

        {/* Body */}
        <div className="space-y-8 flex-1">
          <div className="flex justify-between border-b border-dotted border-zinc-400 pb-4">
            <span className="text-sm uppercase tracking-widest text-zinc-500">
              Applicant
            </span>
            <span className="text-xl font-medium text-zinc-800">
              {data.name}
            </span>
          </div>

          <div className="border-b border-dotted border-zinc-400 pb-4">
            <p className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
              Stated Reason (Unverified)
            </p>
            <p className="text-xl text-zinc-800 leading-relaxed">
              {data.reason}
            </p>
            <p className="text-sm text-zinc-500 italic mt-2">
              Noted. No further comment will be made at this time.
            </p>
          </div>

          <div className="flex justify-between border-b border-dotted border-zinc-400 pb-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-zinc-500">
                Leave Date
              </p>
              <p className="text-xl font-medium text-zinc-800 mt-1">
                {new Date(data.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm uppercase tracking-widest text-zinc-500">
                Due Date
              </p>
              <p className="text-xl font-medium text-zinc-800 mt-1">
                {new Date(data.dueDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-sm uppercase tracking-widest text-zinc-500">
              Permission Code
            </span>
            <span className="text-xl font-mono text-zinc-800">{data.code}</span>
          </div>
        </div>

        {/* Seal + signature */}
        <div className="flex justify-between items-end mt-10 pt-6 border-t border-zinc-400">
          <div>
            <p className="text-2xl italic text-zinc-600">
              Self-Issued, As Usual
            </p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
              Authorized Signature
            </p>
          </div>
          <div className="w-24 h-24 shrink-0 rounded-full border-2 border-zinc-400 flex items-center justify-center rotate-[-12deg]">
            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter text-center leading-tight">
              Acknowledged
              <br />
              Under Protest
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-400 tracking-[0.2em] uppercase mt-6">
          The issuing party accepts no responsibility for whatever this is
        </p>
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
