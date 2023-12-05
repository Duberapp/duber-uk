import { useState, useEffect } from "react";
import { DecryptPassword } from "../../../utils/securePassword";
import { updateAuthPassword } from "../../../config/supabaseFunctions";
import { successToast, errorToast } from "../UI/Toast";
import { Toaster } from "react-hot-toast";

const AccountCredentialsCard = ({ userData }) => {
  const decryptedPassword = DecryptPassword(userData.encrypted_password || "");
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(decryptedPassword);
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    setEmail(userData.email);
    setPassword(decryptedPassword);
  }, [userData]);

  // Update Authentication Password
  const handlePasswordUpdate = async () => {
    try {
      if (password !== decryptedPassword) {
        if (password && repeatPassword) {
          if (repeatPassword !== password)
            throw new Error("Passwords not matching.!");

          const res = await updateAuthPassword(password, userData.email);

          successToast("Password Updated !");
        } else {
          throw new Error("Please fill all required fields.");
        }
      }
    } catch (err) {
      console.log(err);
      errorToast(err.message);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <p className="mb-3 font-semibold text-navyBlue text-lg">
        Account Credentials
      </p>

      {/* ============ Row 1 ============ */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Email</p>
        <input
          type="text"
          className="mt-2 w-full h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
          placeholder="Phone Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* ============ Row 2 ============ */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Password</p>
        <input
          type="password"
          className="mt-2 w-full h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
          placeholder="Phone Number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* ============ Row 3 ============ */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Repeat Password</p>
        <input
          type="password"
          className="mt-2 w-full h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
          placeholder="Phone Number"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>

      <div className="w-full flex items-center justify-end">
        <button
          onClick={handlePasswordUpdate}
          className="mt-4 bg-navyBlue w-36 h-11 rounded-md text-white text-sm"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AccountCredentialsCard;
