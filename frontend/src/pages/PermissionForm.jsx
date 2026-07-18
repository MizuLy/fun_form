import React, { useState } from "react";
import { createPermission } from "../api/Permission";
import toast, { Toaster } from "react-hot-toast";
import PermissionReceipt from "../components/PermissionReceipt";

export default function PermissionForm() {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    reason: "",
    date: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createPermission(form);
      toast.success(`Permission form has been created!`);
      setReceipt(res.data.data);
    } catch (err) {
      const message = err.response?.data?.error;

      if (message === "All the fields are required") {
        toast.error("Please fill in every field");
      } else if (message === "Due date can't be before leave date") {
        toast.error("Due date can't be before leave date");
      } else {
        toast.error("Something went wrong, try again");
      }

      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return receipt ? (
    <PermissionReceipt data={receipt} />
  ) : (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-zinc-950 border border-zinc-800 rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-md tracking-[0.3em] text-zinc-400 font-light uppercase">
          Permission Form
        </h1>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors"
        />

        {/* Reason Input */}
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Tell us your reason..."
          rows={3}
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors resize-none"
        />

        {/* Date Input with Label */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-zinc-500 uppercase font-light">
            Start Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 focus:border-zinc-500 transition-colors"
          />
        </div>

        {/* Due Date Input with Label */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-zinc-500 uppercase font-light">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 focus:border-zinc-500 transition-colors"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 bg-white text-black text-xs tracking-[0.2em] uppercase font-light py-3 rounded-md hover:bg-zinc-200 transition-colors"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              Generating form
              <span className="loading loading-dots loading-sm"></span>
            </span>
          ) : (
            "Generate Slip"
          )}
        </button>
      </form>
    </div>
  );
}
