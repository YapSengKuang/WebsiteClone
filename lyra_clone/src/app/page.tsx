"use client";

import { useSession } from "@clerk/nextjs";
import { api } from "@/trpc/react";
import Link from "next/link";
import CreateBaseButton from "./_components/CreateBaseButton";
import BaseCard from "./_components/BaseCard";

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bases?.map((base) => (
            <BaseCard key={base.id} id={base.id} name={base.base_name} />
          ))}

          <CreateBaseButton />
        </div>
      </div>
      </div>
      
    </main>
  );
}
