import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchCollections, fetchEvents } from "../../store/reducers/event";
import EventSelector from "./EventSelector";
import CollectionTable from "./CollectionTable";
import ReactPaginate from "react-paginate";
import { ICollection } from "../../definitions/event";

const Events: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, collection } = useAppSelector((state) => state.event);
  const userId = "user_123"; // Replace with actual user ID

  // Fetch events if not already loaded
  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const onSelect = (eventId: string) => {
    console.log("Selected Event ID:", eventId);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch collections when component mounts or when itemsPerPage changes (resetting page to 0)
  useEffect(() => {
    dispatch(fetchCollections({ eventId: "67db0140e6a9d94b79fa699b", pageIndex: 0, pageSize: itemsPerPage }));
    setCurrentPage(0);
  }, [dispatch, itemsPerPage]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected;
    setCurrentPage(newPage);
    dispatch(fetchCollections({ eventId: "67db0140e6a9d94b79fa699b", pageIndex: newPage, pageSize: itemsPerPage }));
  };

  const handleSaveCollection = (id: string, updatedData: Partial<ICollection>) => {
    // Implement your save logic here
  };

  // Use the data from the store (assumed to be already paginated by the backend)
  const currentData: ICollection[] = collection?.selectedEventCollections || [];
  const pageCount = collection ? Math.ceil(collection.totalCount / itemsPerPage) : 0;
  console.log(pageCount)

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
          Total Collection: <strong>₹500</strong>
        </p>
        <p>
          Your Collection: <strong>₹5</strong>
        </p>
      </div>

      <CollectionTable
        collections={currentData}
        currentUserId={userId}
        onSave={handleSaveCollection}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 mb-4">
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex space-x-2"
          previousClassName="px-3 py-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 -mt-1"
          nextClassName="px-3 py-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 -mt-1"
          disabledClassName="opacity-50 cursor-not-allowed"
          activeClassName="flex items-center justify-center bg-blue-500 text-white px-3 py-1 rounded-md -mt-1"
        />
      </div>
    </div>
  );
};

export default Events;
