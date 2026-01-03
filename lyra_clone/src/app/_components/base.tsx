"use client";

import { api } from "@/trpc/react";

export default function BaseList() {
    const { data, isLoading } = api.base.getAllWithTables.useQuery();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div> 
            {data?.map((b) => ( 
                <div key={b.id}>{b.base_name}</div> 
            ))} 
        </div>
    );
}
