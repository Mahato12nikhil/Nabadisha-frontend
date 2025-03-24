import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchCollections, fetchExpenses, fetchEvents } from "../../store/reducers/event";
import EventSelector from "./EventSelector";
import { ICollection, IExpense } from "../../definitions/event";
import Table from "../../components/Table";
import { ColDef } from "ag-grid-community";
import Modal from "../../components/Modal";

const Events: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, collection, expense, selectedEvent } = useAppSelector((state) => state.event);
  const { user } = useAppSelector((state) => state.user);
  const [eventId, setEventId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollectionMode, setIsCollectionMode] = useState(true);
  const [newEntry, setNewEntry] = useState<{ name: string; description?:String,amount: string }>({ name: "", amount: "", description:"" });

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchCollections({ eventId }));
      dispatch(fetchExpenses({ eventId }));
    }
  }, [eventId]);

  const onSelect = (eventId: string) => {
    setEventId(eventId);
  };

  const handleSaveEntry = () => {
    console.log(isCollectionMode ? "Saving collection:" : "Saving expense:", newEntry);
    setIsModalOpen(false);
    setNewEntry({ name: "", amount: "" });
  };

  const columnDefs: ColDef<ICollection>[] = [
    {
      headerName: "Name",
      field: "contributor",
      cellStyle: { textAlign: "center" },
      singleClickEdit: true,
    },
    {
      headerName: "Amount",
      field: "amount",
      valueFormatter: (params) => `₹${params.value}`,
      cellStyle: { textAlign: "center" },
      singleClickEdit: true,
    },
    {
      headerName: "Collector",
      field: "createdBy",
      valueFormatter: (params) => `${params.value}`,
      cellStyle: { textAlign: "center" },
      singleClickEdit: true,
    },
    {
      headerName: "Submitted to",
      field: "approved",
      valueGetter: (params) => (params.data?.createdBy === user?.username ? "pending" : params.data?.approvedBy),
      cellStyle: { textAlign: "center" },
      singleClickEdit: true,
    },
  ];
  
  const expenseColumnDefs: ColDef<IExpense>[] = [
    {
      headerName: "Name",
      field: "name",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Amount",
      field: "amount",
      valueFormatter: (params) => `₹${params.value}`,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Spent By",
      field: "createdBy",
      cellStyle: { textAlign: "center" },
    }
  ];

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4">
      <div className="w-60">
        <EventSelector events={events} onSelect={onSelect} />
      </div>

      <div className="bg-accent p-4 rounded-lg w-full max-w-md m-2">
        <h2 className="text-lg font-semibold">
          Treasurer: <span>{selectedEvent?.eventManagement.treasurer}</span>
        </h2>
        <p className="mt-2">
          Total Collection: <strong>₹{collection.totalCollection}</strong>
        </p>
        <p>
          Your Collection: <strong>₹{collection.currentUserCollection}</strong>
        </p>
        <p>
          Total Expense: <strong>₹{expense.totalExpenses}</strong>
        </p>
        <p>
          Your Expense: <strong>₹{expense.currentUserExpense}</strong>
        </p>

        <div className="flex justify-center items-center mt-4">
          <ModeToggle isCollectionMode={isCollectionMode} setIsCollectionMode={setIsCollectionMode} />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
        >
          {isCollectionMode ? "Add Collection" : "Add Expense"}
        </button>
      </div>

      <Table
        data={isCollectionMode ? collection.data : expense.data} 
        coldefs={isCollectionMode ? columnDefs : expenseColumnDefs}
        currentUserName={user?.name || ""}
        onSave={() => {}}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-semibold">
            {isCollectionMode ? "Add New Collection" : "Add New Expense"}
          </h2>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mt-2"
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          />
           {!isCollectionMode &&
          <input
           type="text"
           placeholder="Description"
           className="border p-2 w-full mt-2"
           value={newEntry.name}
           onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
         />
           
          }
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full mt-2"
            value={newEntry.amount}
            onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
          />
          <button onClick={handleSaveEntry} className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4">
            Save
          </button>
        </Modal>
      )}
    </div>
  );
};
const ModeToggle = ({ isCollectionMode, setIsCollectionMode }: { isCollectionMode: boolean; setIsCollectionMode: (value: boolean) => void }) => {
  return (
      <div className="flex items-center gap-2 p-2 bg-toggle-button-back dark:bg-gray-800 rounded-full">
          <button
              onClick={() => setIsCollectionMode(true)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  isCollectionMode ? "bg-blue-600 text-white" : "bg-transparent text-gray-600 dark:text-gray-300"
              }`}
          >
              Collection
          </button>
          <button
              onClick={() => setIsCollectionMode(false)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  !isCollectionMode ? "bg-blue-600 text-white" : "bg-transparent text-gray-600 dark:text-gray-300"
              }`}
          >
              Expense
          </button>
      </div>
  );
};
export default Events;
