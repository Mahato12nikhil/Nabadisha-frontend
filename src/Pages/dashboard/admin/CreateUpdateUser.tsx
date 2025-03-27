import { useState } from "react";
import { CreateUser } from "../../../services/backend";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { toast } from "sonner";
import { ICreateUser } from "../../../definitions/user";
import { ToggleSwitch } from "../../../components/ToggleSwitch";

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
    userPic: "", // Optional
    roles: [],
    socials: { facebook: "", instagram: "", linkedin: "" }, // Optional
  });

  const [userImage, setUserImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
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
    if (!userImage) return "";

    const storageRef = ref(storage, `users/${userImage.name}`);
    const snapshot = await uploadBytes(storageRef, userImage);
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

      if (userImage) {
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

  return (
    <div className="w-full flex flex-col items-center mt-5 space-y-4 px-4 md:px-0">
      <h2 className="text-xl font-semibold">
        {mode === MODES.CREATE ? "Create New User" : "Update User"}
      </h2>

      <ToggleSwitch options={[MODES.CREATE, MODES.UPDATE]} selectedOption={mode} setSelectedOption={setMode} />

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={userData.name}
        onChange={handleChange}
        className="border p-2 w-full max-w-md rounded-md"
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={userData.username}
        onChange={handleChange}
        className="border p-2 w-full max-w-md rounded-md"
      />

      {mode === MODES.CREATE && (
        <>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="border p-2 w-full max-w-md rounded-md"
          />

          <input
            type="text"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="border p-2 w-full max-w-md rounded-md"
          />
        </>
      )}

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={userData.phone}
        onChange={handleChange}
        className="border p-2 w-full max-w-md rounded-md"
      />

      <div className="w-full max-w-md flex flex-col space-y-2">
        <label className="text-sm font-medium">Profile Picture (Optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setUserImage(e.target.files ? e.target.files[0] : null)}
          className="border p-2 rounded-md"
        />
        {userImage && (
          <div className="relative w-20 h-20 border rounded-md overflow-hidden">
            <img src={URL.createObjectURL(userImage)} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => setUserImage(null)}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
            >
              x
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-md flex flex-col space-y-2">
        <label className="text-sm font-medium">Roles</label>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <label key={role} className="flex items-center space-x-2 border px-3 py-1 rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={userData.roles.includes(role)}
                onChange={() => handleRoleChange(role)}
              />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full max-w-md space-y-2">
        <label className="text-sm font-medium">Social Links (Optional)</label>
        <input
          type="text"
          name="facebook"
          placeholder="Facebook URL"
          value={userData.socials.facebook}
          onChange={(e) => setUserData({ ...userData, socials: { ...userData.socials, facebook: e.target.value } })}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram URL"
          value={userData.socials.instagram}
          onChange={(e) => setUserData({ ...userData, socials: { ...userData.socials, instagram: e.target.value } })}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={userData.socials.linkedin}
          onChange={(e) => setUserData({ ...userData, socials: { ...userData.socials, linkedin: e.target.value } })}
          className="border p-2 rounded-md"
        />
      </div>

      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full max-w-md" disabled={loading}>
        {loading ? (mode === MODES.CREATE ? "Creating..." : "Updating...") : mode === MODES.CREATE ? "Create User" : "Update User"}
      </button>
    </div>
  );
};

export default CreateUpdateUser;
