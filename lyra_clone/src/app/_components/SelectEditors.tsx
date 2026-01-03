"use client";

type SelectEditorProps = {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  options: string[];
};

export function SingleSelectEditor({
  value,
  onChange,
  onBlur,
  options,
}: SelectEditorProps) {
  return (
    <select
      className="w-full p-1 bg-transparent outline-none"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    >
      <option value="">—</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function MultiSelectEditor({
  value,
  onChange,
  onBlur,
  options,
}: SelectEditorProps) {
  const current = Array.isArray(value) ? value : [];

  const toggle = (opt: string) => {
    if (current.includes(opt)) {
      onChange(current.filter((v) => v !== opt));
    } else {
      onChange([...current, opt]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 p-1" onBlur={onBlur}>
      {options.map((opt) => {
        const selected = current.includes(opt);
        return (
          <span
            key={opt}
            onClick={() => toggle(opt)}
            className={`px-2 py-1 rounded cursor-pointer ${
              selected ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {opt}
          </span>
        );
      })}
    </div>
  );
}
