import { useCallback, useEffect, useRef, useState } from "react";
import { ICollection } from "../definitions/event";
import { CellValueChangedEvent, ColDef, GridReadyEvent, themeAlpine, themeBalham, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { CellStyleModule, ClientSideRowModelModule, ColumnAutoSizeModule, ModuleRegistry, NumberEditorModule, NumberFilterModule, PaginationModule, QuickFilterModule, TextEditorModule, TextFilterModule, ValidationModule } from "ag-grid-community";


ModuleRegistry.registerModules([
  CellStyleModule,
  ColumnAutoSizeModule,
  NumberFilterModule,
  QuickFilterModule,
  PaginationModule,
  ClientSideRowModelModule,
  ValidationModule ,
  TextEditorModule,
  NumberEditorModule,
  TextFilterModule
]);
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
    approvedBy: ""
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
  }
];
interface TableProps {
  coldefs:  ColDef<ICollection>[],
  data:ICollection[],
  currentUserName: string;
  onSave: (id: string, updatedData: Partial<ICollection>) => void;
}
const Table: React.FC<TableProps> = ({
  coldefs,
  data,
  currentUserName,
  onSave,
})=>{
  console.log(data.at(0))
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

      <div className="w-full h-[500px] rounded-lg border">
        <AgGridReact<ICollection>
          ref={gridRef}
          modules={[ClientSideRowModelModule]}
          rowData={data}
          theme={themeBalham}
          columnDefs={coldefs}
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


export default Table;
