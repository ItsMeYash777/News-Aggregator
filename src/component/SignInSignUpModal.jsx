import { useEffect } from "react";

const SignInSignUpModal = ({ isSignUp, closeModal }) => {
     useEffect(() => {
       document.body.style.overflow = "hidden"; // Disable scrolling

       return () => {
         document.body.style.overflow = "auto"; // Re-enable scrolling when modal closes
       };
     }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        <form>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Close button */}
        <button
          onClick={closeModal}
          className="mt-4 w-full text-center text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignInSignUpModal;
