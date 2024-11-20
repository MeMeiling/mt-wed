export default function Garden() {
    // ตัวอย่างข้อมูล (แทนด้วย Firebase ในอนาคต)
    const wishes = [
      { id: 1, name: "Alice", message: "Congratulations!", color: "#f4a261" },
      { id: 2, name: "Bob", message: "Wishing you happiness!", color: "#e76f51" },
      { id: 3, name: "Charlie", message: "Best wishes on your journey!", color: "#2a9d8f" },
    ];
  
    return (
      <div className="min-h-screen bg-[#fefae0] p-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#6b705c] text-center mb-8">
          Flower Garden
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4"
              style={{ backgroundColor: wish.color }}
            >
              <h2 className="text-lg font-bold text-white">{wish.name}</h2>
              <p className="text-white text-center">{wish.message}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  