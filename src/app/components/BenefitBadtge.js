export default function BenefitBadge({ text }) {
  return (
    <div className="absolute top-1 right-3 w-20 h-20 bg-indigo-600 text-white text-[10px] font-semibold flex items-center justify-center rounded-full shadow-md z-10">
      {text}
    </div>
  );
}
