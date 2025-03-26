import { useState } from "react";
import { CreateEvent } from "../../../services/backend";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { toast } from "sonner";
import { ICreateEvent } from "../../../definitions/event";
import { ToggleSwitch } from "../../../components/ToggleSwitch";

const MODES = {
  CREATE: "Create",
  UPDATE: "Update",
};

const CreateUpdateEvent = () => {
  const [mode, setMode] = useState<string>(MODES.CREATE);
  const [eventData, setEventData] = useState<ICreateEvent>({
    name: "",
    description: "",
    eventImages: [],
    status: "active",
    startDate: Date.now(),
    endDate: Date.now(),
    eventManagement: {
      president: "",
      treasurers: [""],
      secretary: "",
      vice_president: "",
      vice_secretary: "",
    },
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: new Date(value).getTime() }));
  };

  const handleImageUpload = async () => {
    const uploadedUrls = await Promise.all(
      images.map(async (image) => {
        const storageRef = ref(storage, `${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        return await getDownloadURL(snapshot.ref);
      })
    );
    return uploadedUrls;
  };

  const handleSubmit = async () => {
    if (!eventData.name || !eventData.startDate || !eventData.endDate) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      let uploadedImages: string[] = [];
      if (images.length) {
        uploadedImages = await handleImageUpload();
      }
      const payload = { ...eventData, eventImages: uploadedImages };
      const res = await CreateEvent(payload);
      if (res.data.success) {
        toast.success("Event created successfully");
        setEventData({
          name: "",
          description: "",
          eventImages: [],
          status: "active",
          startDate: Date.now(),
          endDate: Date.now(),
          eventManagement: {
            president: "",
            treasurers: [""],
            secretary: "",
            vice_president: "",
            vice_secretary: "",
          },
        });
        setImages([]);
      } else {
        toast.error("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4 px-4 md:px-0">
      <h2 className="text-xl font-semibold">Manage Event</h2>

      <ToggleSwitch
        options={[MODES.CREATE, MODES.UPDATE]}
        selectedOption={mode}
        setSelectedOption={setMode}
      />

      {mode === MODES.CREATE ? (
        <>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={eventData.name}
            onChange={handleChange}
            className="border p-2 w-full max-w-md rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={eventData.description}
            onChange={handleChange}
            className="border p-2 w-full max-w-md rounded-md"
          />
          <input
            type="date"
            name="startDate"
            onChange={handleDateChange}
            className="border p-2 w-full max-w-md rounded-md"
          />
          <input
            type="date"
            name="endDate"
            onChange={handleDateChange}
            className="border p-2 w-full max-w-md rounded-md"
          />

          <h3 className="text-lg">Event Management</h3>
          <input
            type="text"
            name="president"
            placeholder="President"
            value={eventData.eventManagement.president}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                eventManagement: {
                  ...prev.eventManagement,
                  president: e.target.value,
                },
              }))
            }
            className="border p-2 w-full max-w-md rounded-md"
          />
          <input
            type="text"
            name="secretary"
            placeholder="Secretary"
            value={eventData.eventManagement.secretary}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                eventManagement: {
                  ...prev.eventManagement,
                  secretary: e.target.value,
                },
              }))
            }
            className="border p-2 w-full max-w-md rounded-md"
          />
          <input
            type="text"
            name="treasurers"
            placeholder="Treasurers (comma separated)"
            value={eventData.eventManagement.treasurers.join(", ")}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                eventManagement: {
                  ...prev.eventManagement,
                  treasurers: e.target.value.split(",").map((t) => t.trim()),
                },
              }))
            }
            className="border p-2 w-full max-w-md rounded-md"
          />

          <input
            type="text"
            name="vice_president"
            placeholder="Vice President"
            value={eventData.eventManagement.vice_president}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                eventManagement: {
                  ...prev.eventManagement,
                  vice_president: e.target.value,
                },
              }))
            }
            className="border p-2 w-full max-w-md rounded-md"
          />

          <input
            type="text"
            name="vice_secretary"
            placeholder="Vice Secretary"
            value={eventData.eventManagement.vice_secretary}
            onChange={(e) =>
              setEventData((prev) => ({
                ...prev,
                eventManagement: {
                  ...prev.eventManagement,
                  vice_secretary: e.target.value,
                },
              }))
            }
            className="border p-2 w-full max-w-md rounded-md"
          />
          <div className="w-full max-w-md flex flex-col space-y-2">
            <label className="text-sm font-medium">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setImages([...images, ...Array.from(e.target.files || [])])
              }
              className="border p-2 rounded-md"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 overflow-hidden border rounded-md relative"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== idx))
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full max-w-md"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </>
      ) : (
        <div>Update Event Form (To be implemented)</div>
      )}
    </div>
  );
};

export default CreateUpdateEvent;
