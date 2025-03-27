import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchEvents,
  fetchEventData,
} from "../../../store/reducers/event";
import EventSelector from "./EventSelector";
import { ICollection, IExpense } from "../../../definitions/event";
import Table from "../../../components/Table";
import { ColDef } from "ag-grid-community";
import Modal from "../../../components/Modal";
import { toast } from "sonner";
import { AddCollection, AddExpense } from "../../../services/backend";
import { ToggleSwitch } from "../../../components/ToggleSwitch";
import Loader from "../../../components/ui/loader";

const Events: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, collection, expense, selectedEvent, loading } = useAppSelector(
    (state) => state.event
  );
  const { user } = useAppSelector((state) => state.user);
  const [eventId, setEventId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollectionMode, setIsCollectionMode] = useState(true);
  const [update, setUpdate] = useState(false);
  const [newEntry, setNewEntry] = useState<{
    name: string;
    description?: string;
    amount: string;
  }>({ name: "", amount: "", description: "" });

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventData({ eventId }));
    }
  }, [eventId, update]);

  const onSelect = (eventId: string) => {
    setEventId(eventId);
  };

  const handleSaveEntry = async () => {
    if (!newEntry.name || Number(newEntry.amount) <= 0) {
      toast.error("Please provide a valid name and amount.");
      return;
    }

    setIsModalOpen(false);
    const { name, amount, description } = newEntry;

    try {
      if (isCollectionMode) {
        const res = await AddCollection({
          eventId,
          contributor: name,
          amount: Number(amount),
        });
        console.log(res);
        if (res.data.success) toast.success("Collection added successfully.");
        else toast.success("something went wrong, failed to add...");
      } else {
        const res = await AddExpense({
          eventId,
          name,
          description: description || '',
          amount: Number(amount),
        });
        console.log(res);
        if (res.data.success) toast.success("Expense added successfully.");
        else toast.success("something went wrong, failed to add...");
      }

      // Reset form fields
      setNewEntry({ name: "", amount: "", description: "" });
      setUpdate(true);
    } catch (error) {
      toast.error("Failed to save entry.");
      console.error("Error saving entry:", error);
    }
  };

  const columnDefs: ColDef<ICollection>[] = [
    {
      headerName: "Name",
      field: "name",
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
      valueGetter: (params) =>
        params.data?.approvedBy || "pending",
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
    },
    {
      headerName: "Approved By",
      field: "approvedBy",
      valueFormatter: (params) => params.data?.approvedBy || "pending",
      cellStyle: { textAlign: "center" },
    },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4 relative">
      <div className="w-60">
        <EventSelector events={events} onSelect={onSelect} />
      </div>

      <div className="bg-accent p-4 rounded-lg w-full max-w-md m-2 relative">
      {loading && <Loader/>}

        <h2 className="text-lg font-semibold">
          Treasurer: {selectedEvent?.eventManagement.treasurers?.map((treasurer)=>(
            <span>{treasurer}, </span>
          ))}
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
          <ToggleSwitch
            options={["Collection", "Expense"]}
            selectedOption={isCollectionMode}
            setSelectedOption={setIsCollectionMode} 
          />
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
          {!isCollectionMode && (
            <input
              type="text"
              placeholder="Description"
              className="border p-2 w-full mt-2"
              value={newEntry.description}
              onChange={(e) =>
                setNewEntry({ ...newEntry, description: e.target.value })
              }
            />
          )}
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full mt-2"
            value={newEntry.amount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*$/.test(value)) {
                setNewEntry((prev) => ({ ...prev, amount: value }));
              }
            }}
          />
          <button
            onClick={handleSaveEntry}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Save
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Events;
