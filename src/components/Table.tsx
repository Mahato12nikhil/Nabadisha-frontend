import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";

interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
  editableFields?: (keyof T)[];
  onSave?: (id: string, updatedData: Partial<T>) => void;
  currentUserId?: string;
}

const Table = <T extends { _id: string }>({
  columns,
  data,
  editableFields = [],
  onSave,
  currentUserId,
}: TableProps<T>) => {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<T>>({});

  useEffect(() => {
    setEditingRowId(null);
    setEditData({});
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleEdit = (reactRowId: string, rowData: T) => {
    setEditingRowId(reactRowId);
    setEditData({ ...rowData }); 
  };

  const handleSave = (reactRowId: string, originalId: string) => {
    if (onSave && editingRowId === reactRowId) {
      onSave(originalId, editData);
      setEditingRowId(null);
      setEditData({});
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 ">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-accent text-center">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th className="border p-2 text-center">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isEditing = editingRowId === row.id;
            const isCurrentUserRow = row.original._id === currentUserId;

            return (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map((cell) => {
                  const field = cell.column.id as keyof T;
                  const isEditable =
                    editableFields.includes(field) && isEditing;
                  return (
                    <td key={cell.id} className="border p-2 text-center">
                      {isEditable ? (
                        <input
                          type={
                            typeof cell.getValue() === "number"
                              ? "number"
                              : "text"
                          }
                          value={String(editData[field] ?? "")}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              [field]: e.target.value,
                            }))
                          }
                          className="border p-1 w-full text-center"
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  );
                })}
                <td className="border p-2 text-center">
                  {isCurrentUserRow ? (
                    isEditing ? (
                      <div className="flex gap-2 justify-center">
                        <FiCheck
                          className="cursor-pointer text-green-600"
                          onClick={() => handleSave(row.id, row.original._id)}
                        />
                        <FiX
                          className="cursor-pointer text-red-600"
                          onClick={() => {
                            setEditingRowId(null);
                            setEditData({});
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        <FiEdit2
                          className="cursor-pointer text-gray-600"
                          onClick={() => handleEdit(row.id, row.original)}
                        />
                      </div>
                    )
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
