"use client";

import { useSession } from "@clerk/nextjs";
import { api } from "@/trpc/react";

export default function Home() {
  const { session } = useSession();
  const { data: bases } = api.base.getAll.useQuery();

  if (!session) return <div>Please sign in</div>;

  return (
    <main>
      <h1>Welcome {session.user?.fullName}</h1>
      {bases?.map((b) => (
        <div key={b.id}>{b.base_name}</div>
      ))}
    </main>
  );
}
