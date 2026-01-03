"use client";

import { api } from "@/trpc/react";
import Link from "next/link";

export default function BaseList() {
  const { data: bases, isLoading } = api.base.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Bases</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bases?.map((base) => (
          <Link
            key={base.id}
            href={`/base/${base.id}`}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            {base.base_name}
          </Link>
        ))}

        {/* Create Base Button */}
        <button className="border rounded-lg p-4 bg-blue-600 text-white">
          + Create Base
        </button>
      </div>
    </div>
  );
}
