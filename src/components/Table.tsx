import { useCallback, useEffect, useRef, useState } from "react";
import { ICollection, IExpense } from "../definitions/event";
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
interface TableProps {
  coldefs: ColDef<ICollection | IExpense | any>[];
  data: (ICollection | IExpense )[];
  currentUserName: string;
  onSave: (id: string, updatedData: Partial<ICollection | IExpense>) => void;
}
const Table: React.FC<TableProps> = ({
  coldefs,
  data,
  currentUserName,
  onSave,
})=>{
  console.log(data.at(0))
  const gridRef = useRef<AgGridReact<ICollection | IExpense>>(null);
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
      (event: CellValueChangedEvent<ICollection | IExpense>) => {
        console.log("Saving updated data...");
    
        if (event.data?.createdBy === currentUserName) {
          const updatedData = { ...event.data }; 
    
          onSave(updatedData._id, updatedData);
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
        <AgGridReact<ICollection | IExpense>
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
