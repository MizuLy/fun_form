import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col justify-center items-center gap-10 px-6">
      <div className="text-center">
        <p className="text-[11px] tracking-[0.3em] text-zinc-600 uppercase mb-2">
          Department of Personal Affairs
        </p>
        <h1 className="text-2xl font-medium text-zinc-50 tracking-[0.1em] uppercase">
          Form Generator
        </h1>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          to="/permission"
          className="flex justify-between items-center px-5 py-4 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors"
        >
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 mb-1">
              Form 1-A
            </p>
            <p className="text-sm font-medium text-zinc-50">Permission Slip</p>
          </div>
          <span className="text-zinc-600 text-lg">→</span>
        </Link>

        <Link
          to="/certificate"
          className="flex justify-between items-center px-5 py-4 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors"
        >
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 mb-1">
              Form 2-B
            </p>
            <p className="text-sm font-medium text-zinc-50">Certificate</p>
          </div>
          <span className="text-zinc-600 text-lg">→</span>
        </Link>
      </div>

      <p className="text-[10px] tracking-[0.2em] text-zinc-700 uppercase">
        Void if questioned too closely
      </p>
    </div>
  );
}
