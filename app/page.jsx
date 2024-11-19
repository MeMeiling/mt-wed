export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fefae0]">
      <h1 className="text-3xl font-bold text-[#6b705c] mb-6">
        Welcome to Our Wedding Celebration
      </h1>
      <h3 className="text-xl text-[#6b705c] mb-12">
        Choose what you'd like to do:
      </h3>
      <div className="flex space-x-4">
        <a
          href="/guestbook"
          className="py-6 px-12 rounded-2xl bg-[#81b29a] text-white font-semibold hover:bg-[#6a9984] transition"
        >
          Join the Wedding and Send Your Wishes
        </a>
        <a
          href="/flower-garden"
          className="py-6 px-12 rounded-2xl bg-[#81b29a] text-white font-semibold hover:bg-[#6a9984] transition"
        >
          View All Wishes (Flower Garden)
        </a>
        <div className="bg-red-500 text-white text-xl">
          This should have a red background and white large text
        </div>
      </div>
    </div>
  );
}
