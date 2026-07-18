import React, { useState } from "react";
import { createCertificate } from "../api/Certificate";
import toast, { Toaster } from "react-hot-toast";
import CertificateReceipt from "../components/CertificateReceipt";

export default function CertificateForm() {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    achievement: "",
    issuedBy: "",
    issuedDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createCertificate(form);
      toast.success("Certificate has been created!");
      setReceipt(res.data.data);
    } catch (err) {
      const message = err.response?.data?.error;
      if (message === "All the fields are required") {
        toast.error("Please fill in every field");
      } else {
        toast.error("Something went wrong, try again");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return receipt ? (
    <CertificateReceipt data={receipt} />
  ) : (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-zinc-950 border border-zinc-800 rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-xs tracking-[0.3em] text-zinc-400 font-light uppercase">
          Certificate Form
        </h1>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Recipient name"
          autoComplete="off"
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors"
        />

        <textarea
          name="achievement"
          value={form.achievement}
          onChange={handleChange}
          placeholder="What did they achieve or complete?"
          rows={3}
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors resize-none"
        />

        <input
          type="text"
          name="issuedBy"
          value={form.issuedBy}
          onChange={handleChange}
          placeholder="Issued by"
          autoComplete="off"
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-zinc-500 uppercase font-light">
            Issue Date
          </label>
          <input
            type="date"
            name="issuedDate"
            value={form.issuedDate}
            onChange={handleChange}
            className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 focus:border-zinc-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-white text-black text-xs tracking-[0.2em] uppercase font-light py-3 rounded-md hover:bg-zinc-200 transition-colors"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              Generating certificate
              <span className="loading loading-dots loading-sm"></span>
            </span>
          ) : (
            "Generate Certificate"
          )}
        </button>
      </form>
    </div>
  );
}
