export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fefae0] px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-[#6b705c] mb-6 text-center">
        Welcome to Our Wedding Celebration
      </h1>
      <h3 className="text-lg md:text-xl text-[#6b705c] mb-12 text-center">
        Choose what you&apos;d like to do:
      </h3>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <a
          href="/guestbook"
          className="py-4 px-8 md:py-6 md:px-12 rounded-2xl bg-[#81b29a] text-white font-semibold hover:bg-[#6a9984] transition text-center"
        >
          Join the Wedding and Send Your Wishes
        </a>
        <a
          href="/garden"
          className="py-4 px-8 md:py-6 md:px-12 rounded-2xl bg-[#81b29a] text-white font-semibold hover:bg-[#6a9984] transition text-center"
        >
          View All Wishes (Garden)
        </a>
      </div>
    </div>
  );
}
