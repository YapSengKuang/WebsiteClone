"use client";

import { useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";
import GridComponent from "@/app/_components/GridComponent";

export default function BasePage({ params }: { params: { baseId: string } }) {
  const { baseId } = params;
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableId");

  // Load all tables
  const { data: tables } = api.table.getByBaseId.useQuery({ baseId });

  // If no table selected, auto-select the first one
  const selectedTableId = tableId ?? tables?.[0]?.id;
  
  // Load full table data
  const { data: tableData } = api.table.getFullTable.useQuery(
    { tableId: selectedTableId! },
    { enabled: !!selectedTableId }
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Tables</h2>

        {tables?.map((table: { id: string; table_name: string }) => (
          <a
            key={table.id}
            href={`/base/${baseId}?tableId=${table.id}`}
            className={`block p-2 rounded ${
              table.id === selectedTableId ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            {table.table_name}
          </a>
        ))}
      </aside>

      {/* Main Grid Area */}
      <main className="flex-1 p-4">
        {tableData ? (
            <GridComponent
                fields={tableData.fields}
                rows={tableData.rows}
                cells={tableData.cells}
            />
        ) : (
          <div>Select a table</div>
        )}
      </main>
    </div>
  );
}
