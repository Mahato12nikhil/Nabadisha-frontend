import { useEffect, useState } from "react";
import { GetContents, UpdateContent } from "../../../services/backend";
import { toast } from "sonner";
import { IContent } from "../../../definitions/content";

const sections = ["about", "events", "mission", "vision"]; // Example sections

const CreateUpdateContent = () => {
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [contentData, setContentData] = useState<IContent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedSection) {
      fetchContent(selectedSection);
    }
  }, [selectedSection]);

  const fetchContent = async (section: string) => {
    try {
      setLoading(true);
      const res = await GetContents();
      if (res.data.success) {
        const content = res.data.data.find(
          (item: IContent) => item.section === section
        );
        if (content) {
          setContentData(content);
        } else {
          setContentData({ _id: "", section, content: { en: {}, bn: {} } });
        }
      } else {
        toast.error("Failed to fetch content.");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Error fetching content.");
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (
    lang: "en" | "bn",
    key: string,
    value: string
  ) => {
    setContentData((prev) =>
      prev
        ? {
            ...prev,
            content: {
              ...prev.content,
              [lang]: {
                ...prev.content[lang],
                [key]: value,
              },
            },
          }
        : null
    );
  };

  const handleUpdate = async () => {
    if (!contentData || !contentData.section) {
      toast.error("Please select a section.");
      return;
    }
    try {
      setLoading(true);
      const res = await UpdateContent(contentData);
      if (res.data.success) {
        toast.success("Content updated successfully.");
      } else {
        toast.error("Failed to update content.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Error updating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4 px-4 md:px-0">
      <h2 className="text-xl font-semibold">Update Content</h2>
      <select
        value={selectedSection}
        onChange={(e) => setSelectedSection(e.target.value)}
        className="border p-2 w-full max-w-md rounded-md"
      >
        <option value="">Select Section</option>
        {sections.map((section) => (
          <option key={section} value={section}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </option>
        ))}
      </select>

      {contentData && (
        <>
          <h3 className="text-lg font-semibold">English Content</h3>
          {Object.keys(contentData.content.en).map((key) => (
            <input
              key={key}
              type="text"
              placeholder={key}
              value={(contentData.content.en as Record<string, string>)[key] || ""}
              onChange={(e) => handleContentChange("en", key, e.target.value)}
              className="border p-2 w-full max-w-md rounded-md"
            />
          ))}

          <h3 className="text-lg font-semibold">Bengali Content</h3>
          {Object.keys(contentData.content.bn).map((key) => (
            <input
              key={key}
              type="text"
              placeholder={key}
              value={(contentData.content.bn as Record<string, string>)[key] || ""}
              onChange={(e) => handleContentChange("bn", key, e.target.value)}
              className="border p-2 w-full max-w-md rounded-md"
            />
          ))}

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full max-w-md"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Content"}
          </button>
        </>
      )}
    </div>
  );
};

export default CreateUpdateContent;
