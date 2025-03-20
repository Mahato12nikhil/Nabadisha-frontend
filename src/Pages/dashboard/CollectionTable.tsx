import { ColumnDef } from "@tanstack/react-table";
import Table from "../../components/Table";
import { ICollection } from "../../definitions/event";

interface CollectionTableProps {
  collections: ICollection[];
  currentUserId: string;
  onSave: (id: string, updatedData: Partial<ICollection>) => void;
}

const CollectionTable: React.FC<CollectionTableProps> = ({ collections, currentUserId, onSave }) => {
  
  const columns: ColumnDef<ICollection>[] = [
    {
      accessorKey: "contributor",
      header: "Name",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info) => `₹${info.getValue()}`,
    },
    {
      accessorKey: "approved",
      header: "Status",
      cell: (info) => info.getValue() as string,
    },
  ];

  return (
    <Table<ICollection>
      columns={columns}
      data={collections}
      editableFields={["contributor", "amount"]}
      onSave={onSave}
      currentUserId={currentUserId}
    />
  );
};

export default CollectionTable;
