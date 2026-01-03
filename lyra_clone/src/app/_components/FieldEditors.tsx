"use client";

type EditorProps = {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
};

export function TextEditor({ value, onChange, onBlur }: EditorProps) {
  return (
    <input
      className="w-full p-1 bg-transparent outline-none"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}

export function NumberEditor({ value, onChange, onBlur }: EditorProps) {
  return (
    <input
      type="number"
      className="w-full p-1 bg-transparent outline-none"
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      onBlur={onBlur}
    />
  );
}

export function CheckboxEditor({ value, onChange, onBlur }: EditorProps) {
  return (
    <input
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
      onBlur={onBlur}
    />
  );
}

export function DateEditor({ value, onChange, onBlur }: EditorProps) {
  return (
    <input
      type="date"
      className="w-full p-1 bg-transparent outline-none"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}
