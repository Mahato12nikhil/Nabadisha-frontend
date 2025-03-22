import React, { useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  CellValueChangedEvent,
  GridReadyEvent,
  ClientSideRowModelModule,
  themeAlpine,
  ModuleRegistry,
  QuickFilterModule,
  ValidationModule,
  ColumnAutoSizeModule,
  NumberFilterModule,
  NumberEditorModule,
  TextEditorModule,
  TextFilterModule,
  
} from "ag-grid-community";
ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  NumberFilterModule,
  QuickFilterModule,
  ClientSideRowModelModule,
  ValidationModule ,
  TextEditorModule,
  NumberEditorModule,
  TextFilterModule
]);
interface ICollection {
  _id: string;
  eventId: string;
  amount: number;
  contributor: string;
  treasurer: string;
  approved: boolean;
  createdAt: number;
  createdBy: string;
}

// Hardcoded data array
const hardcodedData: ICollection[] = [
  {
    _id: "67dc4d6972c1da1f0e70180e",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 53605,
    contributor: "Clarke Lowe",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1737907146403,
    createdBy: "fugiat",
  },
  {
    _id: "67dc4d6972c1da1f0e70180d",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 98659,
    contributor: "Jana Carlson",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1736068433149,
    createdBy: "amet",
  },
  {
    _id: "67dc4d6972c1da1f0e70180c",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 83547,
    contributor: "Stacie Luna",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1740007669843,
    createdBy: "enim",
  },
  {
    _id: "67dc4d6972c1da1f0e70180b",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 60024,
    contributor: "Bush Anderson",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1740378759571,
    createdBy: "occaecat",
  },
  {
    _id: "67dc4d6972c1da1f0e70180a",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 52732,
    contributor: "Keller Lynn",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1732890558866,
    createdBy: "ad",
  },
  {
    _id: "67dc4d6972c1da1f0e701809",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 38436,
    contributor: "Lisa Forbes",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1739726834880,
    createdBy: "aute",
  },
  {
    _id: "67dc4d6972c1da1f0e701808",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 74761,
    contributor: "Velazquez Knight",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1734425294871,
    createdBy: "in",
  },
  {
    _id: "67dc4d6972c1da1f0e701807",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 88074,
    contributor: "Nicholson Walker",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1733417518299,
    createdBy: "incididunt",
  },
  {
    _id: "67dc4d6972c1da1f0e701806",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 99753,
    contributor: "Christa Velez",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1736366183094,
    createdBy: "consequat",
  },
  {
    _id: "67dc4d6972c1da1f0e701805",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 12799,
    contributor: "Stokes Reid",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1740040472325,
    createdBy: "fugiat",
  },

  {
    _id: "67dc4d6972c1da1f0e70180d",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 98659,
    contributor: "Jana Carlson",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1736068433149,
    createdBy: "amet",
  },
  {
    _id: "67dc4d6972c1da1f0e70180c",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 83547,
    contributor: "Stacie Luna",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1740007669843,
    createdBy: "enim",
  },
  {
    _id: "67dc4d6972c1da1f0e70180b",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 60024,
    contributor: "Bush Anderson",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1740378759571,
    createdBy: "occaecat",
  },
  {
    _id: "67dc4d6972c1da1f0e70180a",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 52732,
    contributor: "Keller Lynn",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1732890558866,
    createdBy: "ad",
  },
  {
    _id: "67dc4d6972c1da1f0e701809",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 38436,
    contributor: "Lisa Forbes",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1739726834880,
    createdBy: "aute",
  },
  {
    _id: "67dc4d6972c1da1f0e701808",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 74761,
    contributor: "Velazquez Knight",
    treasurer: "chanakya123",
    approved: false,
    createdAt: 1734425294871,
    createdBy: "in",
  },
  {
    _id: "67dc4d6972c1da1f0e701807",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 88074,
    contributor: "Nicholson Walker",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1733417518299,
    createdBy: "incididunt",
  },
  {
    _id: "67dc4d6972c1da1f0e701806",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 99753,
    contributor: "Christa Velez",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1736366183094,
    createdBy: "consequat",
  },
  {
    _id: "67dc4d6972c1da1f0e701805",
    eventId: "67db0140e6a9d94b79fa699b",
    amount: 12799,
    contributor: "Stokes Reid",
    treasurer: "chanakya123",
    approved: true,
    createdAt: 1740040472325,
    createdBy: "fugiat",
  },
];


interface CollectionAgGridTableProps {
  currentUserName: string;
  onSave: (id: string, updatedData: Partial<ICollection>) => void;
}

const CollectionAgGridTable: React.FC<CollectionAgGridTableProps> = ({
  currentUserName,
  onSave,
}) => {
  const [rowData] = useState<ICollection[]>(hardcodedData);
  const gridRef = useRef<AgGridReact<ICollection>>(null);
  const [quickFilterText, setQuickFilterText] = useState<string>("");
  const [isGridReady, setIsGridReady] = useState<boolean>(false);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    setIsGridReady(true);
  }, []);

  const onQuickFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setQuickFilterText(e.target.value);
  };

  const columnDefs: ColDef<ICollection>[] = [
    {
      headerName: "Contributor",
      field: "contributor",
      editable: (params) => params.data?.createdBy === currentUserName,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Amount",
      field: "amount",
      editable: (params) => params.data?.createdBy === currentUserName,
      valueFormatter: (params) => `₹${params.value}`,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "CollectedBy",
      field: "createdBy",
      cellRenderer: (params: any) =>
        params.value === currentUserName ? "Me" : params.value,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Status",
      field: "approved",
      valueGetter: (params) =>
        params.data?.approved ? "Approved" : "Not Approved",
      cellStyle: { textAlign: "center" },
      // Remove getQuickFilterText
    },
  ];
  const onCellValueChanged = useCallback(
    (event: CellValueChangedEvent<ICollection>) => {
      if (event.data?.createdBy === currentUserName) {
        onSave(event.data._id, event.data);
      }
    },
    [currentUserName, onSave]
  );

  return (
    <div className="md:p-5 p-2 w-full">
      <div className="mb-4">
        <input
          type="text"
          value={quickFilterText}
          onChange={onQuickFilterChange}
          placeholder="Search..."
          className="w-full md:w-[20%] p-2 border rounded"
        />
      </div>

      <div className="ag-theme-alpine w-full h-[500px] rounded-lg border">
        <AgGridReact<ICollection>
          ref={gridRef}
          modules={[ClientSideRowModelModule]}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            sortable: true,
            filter: true,
            resizable: true,
            headerClass:
              "text-center bg-blue-100 text-black-800 font-semibold",
            cellStyle: { textAlign: "center" },
          }}
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
          quickFilterText={quickFilterText}
          icons={{
            pageButtonFirst: '<span class="text-xl">&#171;</span>',
            pageButtonLast: '<span class="text-xl">&#187;</span>',
            pageButtonPrevious: '<span class="text-xl">&#8249;</span>',
            pageButtonNext: '<span class="text-xl">&#8250;</span>',
          }}
        />
      </div>
    </div>
  );
};

export default CollectionAgGridTable;