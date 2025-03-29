import { useState } from "react";
import { CreateUser } from "../../../services/backend";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { toast } from "sonner";
import { ICreateUser } from "../../../definitions/user";
import { ToggleSwitch } from "../../../components/ToggleSwitch";
import ProfileImageCropper from "../../../components/ProfileImageCropper";

const MODES = {
  CREATE: "Create",
  UPDATE: "Update",
};

const ROLES = ["admin", "member", "treasurer"];

const CreateUpdateUser = () => {
  const [mode, setMode] = useState<string>(MODES.CREATE);
  const [userData, setUserData] = useState<ICreateUser & { confirmPassword?: string }>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    isActive: true,
    userPic: "",
    roles: [],
    socials: { facebook: "", instagram: "", linkedin: "" },
  });

  const [userImage, setUserImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // ✅ Added preview image state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (["facebook", "instagram", "linkedin"].includes(name)) {
      setUserData((prev) => ({
        ...prev,
        socials: { ...prev.socials, [name]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleChange = (role: string) => {
    setUserData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleImageUpload = async () => {
    if (!croppedImage) return "";

    const response = await fetch(croppedImage);
    const blob = await response.blob();
    const file = new File([blob], `cropped_${userImage?.name || "image"}.jpg`, { type: "image/jpeg" });

    const storageRef = ref(storage, `users/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async () => {
    if (!userData.name || !userData.username || !userData.phone) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (mode === MODES.CREATE && (!userData.password || !userData.confirmPassword)) {
      toast.error("Please enter and confirm your password.");
      return;
    }

    if (mode === MODES.CREATE && userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      let uploadedImageUrl = userData.userPic || "";

      if (croppedImage) {
        uploadedImageUrl = await handleImageUpload();
      }

      const { confirmPassword, ...payload } = { ...userData, userPic: uploadedImageUrl };

      let res;
      if (mode === MODES.CREATE) {
        res = await CreateUser(payload);
      } else {
        toast.info("Update functionality to be implemented.");
        return;
      }

      if (res.data.success) {
        toast.success(`User ${mode === MODES.CREATE ? "created" : "updated"} successfully`);
        setUserData({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          phone: "",
          isActive: true,
          userPic: "",
          roles: [],
          socials: { facebook: "", instagram: "", linkedin: "" },
        });
        setUserImage(null);
        setCroppedImage(null);
        setPreviewImage(null); // Reset preview after submit
      } else {
        toast.error(`Failed to ${mode === MODES.CREATE ? "create" : "update"} user.`);
      }
    } catch (error) {
      console.error(`Error ${mode === MODES.CREATE ? "creating" : "updating"} user:`, error);
      toast.error(`Error ${mode === MODES.CREATE ? "creating" : "updating"} user.`);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection and image preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(file);
      setPreviewImage(imageUrl); // Set preview image
      setCropperOpen(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4 px-4 md:px-0">
      <h2 className="text-xl font-semibold">
        {mode === MODES.CREATE ? "Create New User" : "Update User"}
      </h2>

      <ToggleSwitch options={[MODES.CREATE, MODES.UPDATE]} selectedOption={mode} setSelectedOption={setMode} />

      <input type="text" name="name" placeholder="Full Name" value={userData.name} onChange={handleChange} className="border p-2 w-full max-w-md rounded-md" />

      <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} className="border p-2 w-full max-w-md rounded-md" />

      {mode === MODES.CREATE && (
        <>
          <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} className="border p-2 w-full max-w-md rounded-md" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={userData.confirmPassword} onChange={handleChange} className="border p-2 w-full max-w-md rounded-md" />
        </>
      )}

      <input type="text" name="phone" placeholder="Phone Number" value={userData.phone} onChange={handleChange} className="border p-2 w-full max-w-md rounded-md" />

      {/* Roles Section */}
      <div className="flex flex-col w-full max-w-md space-y-2">
        <label className="text-sm font-medium">Roles</label>
        {ROLES.map((role) => (
          <label key={role} className="flex items-center space-x-2">
            <input type="checkbox" checked={userData.roles.includes(role)} onChange={() => handleRoleChange(role)} />
            <span>{role}</span>
          </label>
        ))}
      </div>

      {/* Socials Section */}
      <div className="flex flex-col w-full max-w-md space-y-2">
        <label className="text-sm font-medium">Social Links</label>
        {Object.keys(userData.socials).map((social) => (
          <input key={social} type="text" name={social} placeholder={`${social.charAt(0).toUpperCase() + social.slice(1)} URL`} value={userData.socials[social]} onChange={handleChange} className="border p-2 rounded-md" />
        ))}
      </div>

      {/* Profile Picture Upload */}
      <div className="w-full max-w-md flex flex-col space-y-2">
        <label className="text-sm font-medium">Profile Picture (Optional)</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded-md" />
      </div>

      {/* Image Preview */}
      {previewImage && (
        <div className="w-full max-w-md flex flex-col items-center">
          <p className="text-sm text-gray-600">Preview:</p>
          <img src={previewImage} alt="Profile Preview" className="w-24 h-24 object-cover border" />
        </div>
      )}

      {/* Profile Image Cropper */}
      {cropperOpen && userImage && (
        <ProfileImageCropper
          imageSrc={previewImage ?? ""}
          onCropComplete={(cropped) => {
            setCroppedImage(cropped);
            setPreviewImage(cropped); 
            setCropperOpen(false);
          }}
          onClose={() => setCropperOpen(false)}
        />
      )}

      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full max-w-md" disabled={loading}>
        {loading ? "Processing..." : mode === MODES.CREATE ? "Create User" : "Update User"}
      </button>
    </div>
  );
};

export default CreateUpdateUser;
