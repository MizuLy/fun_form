import { Link } from "react-router-dom";

export default function PageExpired() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div
        className="border border-zinc-800 p-12 max-w-sm w-full text-center"
        style={{ fontFamily: "Georgia, serif" }}
      >
        <p className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-6">
          Department of Personal Affairs
        </p>
        <h1 className="text-6xl font-normal text-zinc-700 mb-2">404</h1>
        <p className="text-sm italic text-zinc-500 mb-1">
          This page has expired.
        </p>
        <p className="text-[10px] text-zinc-700 tracking-widest uppercase mb-8">
          File sealed · No further action
        </p>
        <Link
          to="/"
          className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase hover:text-white transition-colors"
        >
          Return to Home
        </Link>
        <p className="text-[8px] text-zinc-800 tracking-widest uppercase mt-10">
          Void if questioned too closely
        </p>
      </div>
    </div>
  );
}
