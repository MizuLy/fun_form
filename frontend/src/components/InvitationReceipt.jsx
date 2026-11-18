import { useRef } from "react";
import { toPng } from "html-to-image";
import ReceiptScaler from "./ReceiptScaler";

const KHMER_MONTHS = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];

const toKhmerDigits = (value) =>
  String(value).replace(/\d/g, (d) => "០១២៣៤៥៦៧៨៩"[d]);

const formatKhmerDate = (iso) => {
  const d = new Date(iso);
  const day = toKhmerDigits(d.getDate());
  const month = KHMER_MONTHS[d.getMonth()];
  const year = toKhmerDigits(d.getFullYear());
  const time = toKhmerDigits(
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`,
  );
  return `ថ្ងៃទី${day} ខែ${month} ឆ្នាំ${year} វេលាម៉ោង ${time} នាទី`;
};

// Moul has no Latin glyphs, so Latin text falls through to Noto Serif.
const MOUL = {
  fontFamily: "'Moul', 'Noto Serif', serif",
  fontWeight: 400,
};
const MOUL_NAME = {
  fontFamily: "'Noto Serif', 'Moul', serif",
  fontWeight: 700,
  fontSynthesis: "none",
};

function Row({ label, children }) {
  return (
    <div className="contents">
      <span className="whitespace-nowrap">{label}</span>
      <span>:</span>
      <span>{children}</span>
    </div>
  );
}

function Stamp() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute bottom-10 right-24 w-40 h-40 pointer-events-none"
      style={{ transform: "rotate(-14deg)", opacity: 0.82, color: "#c8323c" }}
      aria-hidden="true"
    >
      <defs>
        <path id="stamp-ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text
        fontFamily="'Noto Serif', serif"
        fontWeight="700"
        fontSize="17"
        letterSpacing="3"
        fill="currentColor"
      >
        <textPath href="#stamp-ring" startOffset="0">
          WEIRD PROJECT ★ OFFICIAL-ISH ★
        </textPath>
      </text>
      <text
        x="100"
        y="96"
        textAnchor="middle"
        fontFamily="'Noto Serif', serif"
        fontWeight="700"
        fontSize="20"
        fill="currentColor"
      >
        APPROVED
      </text>
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fontFamily="'Noto Serif', serif"
        fontSize="12"
        letterSpacing="2"
        fill="currentColor"
      >
        (PROBABLY)
      </text>
    </svg>
  );
}

export default function InvitationReceipt({ data }) {
  const receiptRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#ffffff",
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
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 gap-6 bg-zinc-950">
      <ReceiptScaler width={780}>
        <div
          ref={receiptRef}
          id="receipt"
          className="relative w-full aspect-[210/297] flex flex-col px-14 py-20 text-zinc-900"
          style={{
            backgroundColor: "#ffffff",
            fontFamily: "'Noto Serif', 'Noto Serif Khmer', serif",
          }}
        >
          <p className="absolute top-8 right-10 text-[10px] leading-tight text-right text-zinc-500 font-sans">
            Invitation
            <br />
            {data.code}
          </p>

          <div className="text-center">
            <h1 className="text-[32px] leading-[1.9]" style={MOUL}>
              ព្រះរាជាណាចក្រកម្ពុជា
            </h1>
            <h2 className="text-[30px] leading-[1.9]" style={MOUL}>
              ជាតិ សាសនា ព្រះមហាក្សត្រ
            </h2>
            <p className="text-zinc-500 text-xl mt-3 tracking-[0.5em]">
              ❖ ❖ ❖
            </p>
          </div>

          <div className="text-center mt-32">
            <p className="text-[32px] leading-[1.9]" style={MOUL}>
              សូមអញ្ជើញ
            </p>
            <p className="text-[32px] leading-[1.9]" style={MOUL_NAME}>
              {data.name}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-[max-content_14px_1fr] gap-x-2 items-start text-[21px] leading-[2.4]">
            <Row label="ចូលរួម">{data.event}</Row>
            <Row label="កាលបរិច្ឆេទ">{formatKhmerDate(data.date)}</Row>
            {data.place && <Row label="ទីកន្លែង">{data.place}</Row>}
            {data.chair && <Row label="ក្រោមអធិបតីភាព">{data.chair}</Row>}
          </div>

          <div className="mt-auto self-end text-center text-[19px] leading-[2]">
            <p>{formatKhmerDate(data.createdAt ?? data.date).split(" វេលា")[0]}</p>
            <div className="h-40" />
            <div className="border-t border-zinc-400 w-56 mx-auto" />
          </div>

          <Stamp />
        </div>
      </ReceiptScaler>

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
