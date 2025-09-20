export default function BenefitRibbon({ text = 'Beneficio' }) {
  return (
    <div className="absolute top-0 right-0 w-32 h-32 overflow-visible z-30 pointer-events-none ">
      <div className="absolute top-9 right-[-18px] w-36 bg-indigo-600 text-white text-xs font-semibold text-center py-1 rotate-45 shadow-md">
        {text}
      </div>
    </div>
  );
}
