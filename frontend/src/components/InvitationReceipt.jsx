import { useRef } from "react";
import { toPng } from "html-to-image";

export default function InvitationReceipt({ data }) {
  const receiptRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#f5f4f0",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `invitation-${data.code}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    }
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Invitation-${data.code}`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 gap-6 bg-zinc-950">
      <div
        ref={receiptRef}
        className="relative w-full max-w-[780px] aspect-[210/297] flex flex-col justify-between p-20"
        style={{ backgroundColor: "#f5f4f0", fontFamily: "Georgia, serif" }}
      >
        <div className="absolute inset-8 border border-zinc-300 pointer-events-none" />
        <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-zinc-400" />
        <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-zinc-400" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-zinc-400" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-zinc-400" />

        <div className="text-center">
          <p className="text-xs tracking-[0.4em] text-zinc-500 uppercase mb-4">
            Department of Personal Affairs
          </p>
          <h1 className="text-4xl font-normal text-zinc-800 uppercase tracking-[0.2em] mb-3">
            Invitation
          </h1>
          <p className="text-base italic text-zinc-600 tracking-widest">
            An Official-ish Request for Your Presence
          </p>
        </div>

        <div className="text-center flex flex-col gap-8">
          <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase">
            You are hereby invited, because a text message felt dangerously casual
          </p>
          <div>
            <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-3">
              Important-ish Person
            </p>
            <h2 className="text-5xl font-normal text-zinc-900">{data.name}</h2>
          </div>
          <div className="border-y border-zinc-300 py-8">
            <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-3">
              Event
            </p>
            <p className="text-2xl italic text-zinc-800">{data.event}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-2">
              Date & Time, Obviously
            </p>
            <p className="text-xl text-zinc-800">
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-xl text-zinc-800 mt-2">
              At {new Date(data.date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="h-px bg-zinc-300 mb-6" />
          <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase">
            Invitation code: {data.code}
          </p>
          <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase mt-3">
            Attendance appreciated. Dramatic entrances and suspiciously large gifts optional.
          </p>
        </div>
      </div>

      <div className="print:hidden flex gap-3">
        <button onClick={handlePrint} className="bg-white text-black text-xs tracking-[0.2em] uppercase py-3 px-6 rounded-md hover:bg-zinc-100 transition-colors">
          Save as PDF
        </button>
        <button onClick={handleDownloadImage} className="bg-zinc-800 text-white text-xs tracking-[0.2em] uppercase py-3 px-6 rounded-md hover:bg-zinc-700 transition-colors">
          Save as Image
        </button>
      </div>
    </div>
  );
}
