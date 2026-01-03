"use client";

import { api } from "sk/trpc/server";

export default function BaseList() {
    const { data, isLoading } = api.base.getAllWithTables.useQuery();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
        {data?.map((base) => (
            <div key={base.id}>
            <h2 className="font-bold text-lg">{base.base_name}</h2>
            <ul>
                {base.tables.map((t) => (
                <li key={t.id}>{t.table_name}</li>
                ))}
            </ul>
            </div>
        ))}
        </div>
    );
}
