"use client";

import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";
import EditableCell from "./EditableCellComponent";

interface GridComponentProps {
  fields: any[];
  rows: any[];
  cells: any[];
}

export default function GridComponent({ fields, rows, cells }: GridComponentProps) {
  /**
   * STEP 1 — Build a fast lookup map for cells
   *
   * Instead of searching the cells array every time,
   * we convert it into:
   *
   *   cellMap[rowId][fieldId] = value
   */
    const cellMap = useMemo(() => {
        const map: Record<string, Record<string, any>> = {};

        // Ensure every row has an entry
        for (const row of rows) {
            map[row.id] = {};
        }

        // Fill in actual cell values
        for (const cell of cells) {
            map[cell.row_id][cell.field_id] = cell.value;
        }

        return map;
    }, [rows, cells]);



  /**
   * STEP 2 — Build dynamic columns from fields
   *
   * Each field becomes a column.
   */
  const columns = useMemo<ColumnDef<any>[]>(
  () =>
    fields.map((field) => ({
      id: field.id,
      header: field.field_name,
      cell: ({ row }) => {
        const rowId = row.original.id;
        const rowCells = cellMap[rowId] || {};
        const value = rowCells[field.id] ?? "";

        const cell = cells.find(
          (c) => c.row_id === rowId && c.field_id === field.id
        );

        if (!cell) return value;

        return (
          <EditableCell
            cellId={cell.id}
            initialValue={value}
            fieldType={field.type}
            fieldOptions={field.options}
    />
  );
},

    })),
  [fields, cellMap, cells]
);

  /**
   * STEP 3 — Create the TanStack Table instance
   */
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  /**
   * STEP 4 — Render the grid
   */
  return (
    <div className="p-4 overflow-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 p-2 bg-gray-100 font-medium"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-gray-300 p-2"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
