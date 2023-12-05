import { useState, useEffect } from "react";
import { updateUser } from "../../../config/supabaseFunctions";
import { successToast, errorToast } from "../UI/Toast";
import { Toaster } from "react-hot-toast";
import { LoadingSpinner } from "../";

const PersonalDetailsCard = ({ userData }) => {
  const [title, setTitle] = useState(userData.title);
  const [firstname, setFirstname] = useState(userData.firstName);
  const [lastname, setLastname] = useState(userData.lastName);
  const [company, setCompany] = useState(userData.companyName);
  const [phone, setPhone] = useState(userData.phoneNumber);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(userData.title);
    setFirstname(userData.firstName);
    setLastname(userData.lastName);
    setCompany(userData.companyName);
    setPhone(userData.phoneNumber);
  }, [userData]);

  // Handle submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data, error } = await updateUser(
        {
          firstName: firstname,
          lastName: lastname,
          title: title,
          phoneNumber: phone,
          companyName: company,
        },
        { email: userData.email }
      );

      if (error) throw new Error("Failed to update user !");

      successToast("User updated successfully !");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      errorToast(err.message);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <p className="mb-3 font-semibold text-navyBlue text-lg">
        Personal Details
      </p>
      <div className="flex items-center gap-x-3">
        {/* Row 1 -> Col 1 */}
        <div className="">
          <p className="text-xs text-gray-500">Title</p>
          <div className="mt-2 flex items-center gap-x-3">
            <button
              type="button"
              onClick={() => setTitle("Mr")}
              className={`h-12 w-12 rounded-md ${
                title === "Mr"
                  ? "bg-primaryTealLight text-primaryTeal"
                  : "bg-gray-100 text-gray-500"
              } text-sm`}
            >
              Mr
            </button>
            <button
              type="button"
              onClick={() => setTitle("Ms")}
              className={`h-12 w-12 rounded-md ${
                title === "Ms"
                  ? "bg-primaryTealLight text-primaryTeal"
                  : "bg-gray-100 text-gray-500"
              } text-sm`}
            >
              Ms
            </button>
            <button
              type="button"
              onClick={() => setTitle("Mrs")}
              className={`h-12 w-12 rounded-md ${
                title === "Mrs"
                  ? "bg-primaryTealLight text-primaryTeal"
                  : "bg-gray-100 text-gray-500"
              } text-sm`}
            >
              Mrs
            </button>
          </div>
        </div>

        {/* Row 1 -> Col 2 */}
        <div className="max-w-[150px]">
          <p className="text-xs text-gray-500">First Name</p>
          <input
            type="text"
            className="w-full mt-2 h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
      </div>

      {/* ============ Row 2 ============ */}
      <div className="mt-4 flex items-center gap-x-3">
        {/* Row 2 -> Col 1 */}
        <div className="max-w-[150px]">
          <p className="text-xs text-gray-500">Last Name</p>
          <input
            type="text"
            className="w-full mt-2 h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        {/* Row 2 -> Col 2 */}
        <div className="max-w-[150px]">
          <p className="text-xs text-gray-500">Company Name</p>
          <input
            type="text"
            className="w-full mt-2 h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
            placeholder="Optional"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      {/* ============ Row 3 ============ */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Phone Number</p>
        <input
          type="text"
          className="mt-2 w-full h-12 bg-gray-100 px-4 rounded-md outline-none text-sm"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="w-full flex items-center justify-end">
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center mt-4 bg-navyBlue w-36 h-11 rounded-md text-white text-sm"
        >
          {loading ? (
            <LoadingSpinner width={5} height={5} color="white" />
          ) : (
            "Update"
          )}
        </button>
      </div>
    </div>
  );
};

export default PersonalDetailsCard;
