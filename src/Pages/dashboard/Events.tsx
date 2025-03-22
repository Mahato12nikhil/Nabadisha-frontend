import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchCollections, fetchEvents } from "../../store/reducers/event";
import EventSelector from "./EventSelector";

import { ICollection } from "../../definitions/event";
import Table from "../../components/Table";
import { ColDef } from "ag-grid-community";

const Events: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, collection } = useAppSelector((state) => state.event);
  const { user } = useAppSelector((state) => state.user);
  // const [colletionData, setCollectionData]=useSta

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const onSelect = (eventId: string) => {
    console.log("Selected Event ID:", eventId);
  };

  useEffect(() => {
    dispatch(fetchCollections({ eventId: "67db0140e6a9d94b79fa699b" }));
  }, []);

  // useEffect(() => {
  //   dispatch(fetchCollections({ eventId: "67db0140e6a9d94b79fa699b" }));
  // }, [collection.data]);

  const columnDefs: ColDef<ICollection>[] = [
    {
      headerName: "Contributor",
      field: "contributor",
      //editable: (params) => params.data?.createdBy === currentUserName,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Amount",
      field: "amount",
      // editable: (params) => params.data?.createdBy === currentUserName,
      valueFormatter: (params) => `₹${params.value}`,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "CollectedBy",
      field: "createdBy",
      cellRenderer: (params: any) => params.value === params.value,
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Status",
      field: "approved",
      valueGetter: (params) =>
        params.data?.approved ? "Approved" : "Not Approved",
      cellStyle: { textAlign: "center" },
    },
  ];

  const handleSaveCollection = (
    id: string,
    updatedData: Partial<ICollection>
  ) => {
    // Implement your save logic here
  };

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4">
      <div className="w-60">
        <EventSelector events={events} onSelect={onSelect} />
      </div>

      <div className="bg-accent p-4 rounded-lg w-full max-w-sm m-2">
        <h2 className="text-lg font-semibold">
          Treasurer: <span>Chanakya Mahato</span>
        </h2>
        <p className="mt-2">
          Total Collection: <strong>{collection.totalCollection}</strong>
        </p>
        <p>
          Your Collection: <strong>{collection.currentUserCollection}</strong>
        </p>
      </div>

      <Table
        data={collection.data}
        coldefs={columnDefs}
        currentUserName={user?.name || ""}
        onSave={handleSaveCollection}
      />
    </div>
  );
};

export default Events;
