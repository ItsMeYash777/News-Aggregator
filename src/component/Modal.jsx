import { useState, useEffect } from "react";
import PreferenceModal from "./PreferencesModal"; // Import your modal component

const NewsList = () => {
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  // Trigger modal after landing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true); // Show the modal after 2 seconds
    }, 2000); // Change the time delay as needed (2000ms = 2s)

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>News Articles</h1>
      <ul>{/* Render your news articles here */}</ul>

      {/* Show the preference modal */}
      {showModal && <PreferenceModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default NewsList;
