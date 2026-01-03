"use client";

import Link from "next/link";

interface BaseCardProps {
  id: string;
  name: string;
}

export default function BaseCard({ id, name }: BaseCardProps) {
  return (
    <Link
      href={`/base/${id}`}
      className="border rounded-lg p-4 hover:bg-gray-50 transition"
    >
      {name}
    </Link>
  );
}
