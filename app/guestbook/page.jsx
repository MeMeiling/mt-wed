export default function Guestbook() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fefae0] px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#6b705c] mb-6">
          Send Your Wishes
        </h1>
        <form className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#6b705c] font-medium mb-2">
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#81b29a] focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="wish" className="block text-[#6b705c] font-medium mb-2">
              Your Wish:
            </label>
            <textarea
              id="wish"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#81b29a] focus:outline-none"
              rows="4"
              placeholder="Write your wish here"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="photo" className="block text-[#6b705c] font-medium mb-2">
              Upload a Photo:
            </label>
            <input type="file" id="photo" className="w-full" />
          </div>
          <button
            type="submit"
            className="w-full bg-[#81b29a] text-white py-3 rounded-md hover:bg-[#6a9984] transition"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
  