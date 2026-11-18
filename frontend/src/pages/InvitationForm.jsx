import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createInvitation } from "../api/Invitation";
import InvitationReceipt from "../components/InvitationReceipt";

const TITLES = [
  { value: "", label: "No title" },
  { value: "លោក", label: "Mr. (លោក)" },
  { value: "លោកស្រី", label: "Mrs. (លោកស្រី)" },
  { value: "កញ្ញា", label: "Miss (កញ្ញា)" },
  { value: "បណ្ឌិត", label: "Dr. (បណ្ឌិត)" },
  { value: "ឯកឧត្តម", label: "H.E. (ឯកឧត្តម)" },
  { value: "លោកជំទាវ", label: "H.E. Mrs. (លោកជំទាវ)" },
];

export default function InvitationForm() {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "លោក",
    name: "",
    event: "",
    date: "",
    time: "",
    place: "",
    chair: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { title, ...rest } = form;
      const fullName = form.name.trim()
        ? [title, form.name.trim()].filter(Boolean).join(" ")
        : "";
      const res = await createInvitation({ ...rest, name: fullName });
      toast.success("Invitation has been created!");
      setReceipt(res.data.data);
    } catch (err) {
      const message = err.response?.data?.error;

      if (message === "All the fields are required") {
        toast.error("Please fill in every field");
      } else if (message === "Invitation date cannot be before today") {
        toast.error("Invitation date cannot be before today");
      } else {
        toast.error("Something went wrong, try again");
      }

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return receipt ? (
    <InvitationReceipt data={receipt} />
  ) : (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-zinc-950 border border-zinc-800 rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-xs tracking-[0.3em] text-zinc-400 font-light uppercase">
          Invitation Form
        </h1>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-zinc-500 uppercase font-light">
            Title
          </label>
          <select
            name="title"
            value={form.title}
            onChange={handleChange}
            className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 focus:border-zinc-500 transition-colors"
          >
            {TITLES.map((t) => (
              <option key={t.value} value={t.value} className="bg-zinc-950">
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Guest name"
          autoComplete="off"
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors"
        />

        <input
          type="text"
          name="event"
          value={form.event}
          onChange={handleChange}
          placeholder="Event name"
          autoComplete="off"
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-zinc-500 uppercase font-light">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 focus:border-zinc-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] tracking-wider text-zinc-500 uppercase font-light">
            Start Time
          </label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 focus:border-zinc-500 transition-colors"
          />
        </div>

        <input
          type="text"
          name="place"
          value={form.place}
          onChange={handleChange}
          placeholder="Place (optional)"
          autoComplete="off"
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors"
        />

        <input
          type="text"
          name="chair"
          value={form.chair}
          onChange={handleChange}
          placeholder="Chaired by (optional)"
          autoComplete="off"
          className="bg-transparent border-b border-zinc-800 text-white text-sm font-light tracking-wide outline-none pb-2 placeholder:text-zinc-600 focus:border-zinc-500 transition-colors"
        />

        <button
          type="submit"
          className="mt-2 bg-white text-black text-xs tracking-[0.2em] uppercase font-light py-3 rounded-md hover:bg-zinc-200 transition-colors"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              Generating invitation
              <span className="loading loading-dots loading-sm"></span>
            </span>
          ) : (
            "Generate Invitation"
          )}
        </button>
      </form>
    </div>
  );
}
