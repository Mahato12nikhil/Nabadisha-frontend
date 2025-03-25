import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchPendingApprovals } from "../../store/reducers/event";
import EventSelector from "./EventSelector";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { toast } from "sonner";
import { ColDef } from "ag-grid-community";
import { ApprovePendingAmount } from "../../services/backend";

const Treasurer: React.FC = () => {
  const { events, collection, expense, selectedEvent } = useAppSelector(
    (state) => state.event
  );
  const dispatch = useAppDispatch();
  const { pendingApproval } = useAppSelector((state) => state.event);
  const [eventId, setEventId] = useState<string>("");
  const [selectedEntry, setSelectedEntry] = useState<{ _id: string; amountType: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchPendingApprovals({ eventId }));
    }
  }, [dispatch, eventId]);

  const onSelect = (eventId: string) => {
    setEventId(eventId);
  };

  const handleApprove = async () => {
    if (!selectedEntry) return;

    try {
        const res = await ApprovePendingAmount({ id: selectedEntry._id, amountType: selectedEntry.amountType });
        if (res.data.success) {
          toast.success("Entry approved successfully.");
          dispatch(fetchPendingApprovals({ eventId }));
        } else {
          toast.error("Failed to approve entry.");
        }
    } catch (error) {
      toast.error("Error approving entry.");
      console.error("Approval error:", error);
    }

    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const columnDefs: ColDef[] = [
    { headerName: "Name", field: "name", cellStyle: { textAlign: "center" } },
    {
      headerName: "Amount",
      field: "amount",
      valueFormatter: (params) => `₹${params.value}`,
      cellStyle: { textAlign: "center" },
    },
    {
        headerName: "Type",
        field: "amountType",
        cellStyle: { textAlign: "center" },
      },
    {
      headerName: "Handled By",
      field: "createdBy",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params: any) => (
        <button
          onClick={() => {
            setSelectedEntry(params.data);
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white px-3 rounded"
        >
          Approve
        </button>
      ),
      cellStyle: { textAlign: "center" },
    },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4">
      <div className="w-60">
        <EventSelector events={events} onSelect={onSelect} />
      </div>

      <Table
        data={pendingApproval.data}
        coldefs={columnDefs}
        currentUserName=""
        onSave={() => {}}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-semibold">Confirm Approval</h2>
          <p>Are you sure you want to approve this entry?</p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleApprove}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Approve
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Treasurer;
