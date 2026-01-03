"use client";

import { useSession } from "@clerk/nextjs";
import { api } from "@/trpc/react";
import Link from "next/link";

export default function Home() {
  const { session } = useSession();
  const { data: bases, isLoading } = api.base.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <div> 
        {/*placehodler for collaspable menu*/}
      </div>
      <div>
        <h1>Home</h1>
        {/*bases are to be shown here
        {bases?.map((b) => (
        <div key={b.id}>{b.base_name}</div>
        
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bases?.map((base: { id: string; base_name: string }) => (

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
      
    </main>
  );
}
