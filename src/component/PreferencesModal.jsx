// src/PreferenceModal.js


const PreferenceModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Select Your Preferences</h2>
        <form>
          <div>
            <label>
              <input type="checkbox" value="Technology" /> Technology
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" value="Health" /> Health
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" value="Sports" /> Sports
            </label>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreferenceModal;
