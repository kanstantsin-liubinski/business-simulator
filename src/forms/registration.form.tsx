import { registerUser } from "actions/register";
import { IFormData } from "interfaces/IFormData";
import { FC, useState } from "react";

interface IRegistrationForm {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationForm: FC<IRegistrationForm> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<IFormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await registerUser(formData);
      
      if (result && 'error' in result) {
        setError(result.error);
      } else {
        window.location.reload();
      }
    } catch (error) {
      setError("Error registering user. Please try again.");
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 overflow-hidden border border-gray-200">
        <h2 className="m-0 px-8 py-6 text-2xl font-semibold text-gray-900 border-b border-gray-100">Sign Up</h2>

        <div className="flex flex-col gap-3 p-8">
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData((prev: IFormData) => ({ ...prev, email: e.target.value }))}
            placeholder="Email address"
            className="w-full h-12 px-4 bg-gray-100 rounded-xl text-gray-900 outline-none transition duration-300 focus:bg-gray-200 placeholder-gray-500"
          />
          <input
            type="password"
            value={formData.password || ""}
            onChange={(e) => setFormData((prev: IFormData) => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
            className="w-full h-12 px-4 bg-gray-100 rounded-xl text-gray-900 outline-none transition duration-300 focus:bg-gray-200 placeholder-gray-500"
          />
          <input
            type="password"
            value={formData.confirmPassword || ""}
            onChange={(e) => setFormData((prev: IFormData) => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm password"
            className="w-full h-12 px-4 bg-gray-100 rounded-xl text-gray-900 outline-none transition duration-300 focus:bg-gray-200 placeholder-gray-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="border-t border-gray-100 px-8 py-6 flex justify-end gap-4">
          <button
            onClick={() => onClose()}
            className="px-6 py-2 rounded-xl text-gray-900 bg-gray-300 hover:bg-gray-400 transition duration-300 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={isLoading}
            className="px-6 py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition duration-300 font-medium disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
