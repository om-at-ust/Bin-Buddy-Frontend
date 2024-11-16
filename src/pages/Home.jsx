import Carousel from "../components/Carousel";

function Home() {
  // Add your images array
  const images = [
    "https://img.freepik.com/free-photo/men-women-help-each-other-collect-garbage_1150-23957.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/recycle-concept-with-woman-collecting-trash_23-2147825504.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/group-activists-friends-collecting-plastic-waste-park-environmental-conservation_1153-4196.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/group-volunteers-collecting-trash-beach-with-teamwork-concept_23-2147827058.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/save-world-ecology-environmental-conservation-perforated-paper-recycle_53876-31051.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/man-wearing-orange-gloves-collecting-garbage-black-bag_1150-23946.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",

    // Add more images as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="text-center mb-8 pt-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-full max-w-5xl mx-auto">
            <h1
              className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text 
                bg-gradient-to-r from-green-600 via-green-500 to-emerald-400
                drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]
                hover:scale-105 transition-transform duration-300
                tracking-normal font-outfit leading-relaxed
                py-2"
            >
              Smart Waste Management System
            </h1>
          </div>

          <div className="relative group">
            <p
              className="text-xl md:text-2xl text-gray-700 font-medium
              tracking-wide px-4 py-2 font-outfit"
            >
              Efficiently managing waste collection across the city
            </p>
            <div
              className="absolute -bottom-1 left-1/2 w-0 h-1 
              bg-gradient-to-r from-green-400 to-emerald-500
              group-hover:w-full group-hover:left-0 
              transition-all duration-300 rounded-full
              shadow-lg"
            ></div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
            <div className="text-green-600 text-2xl">♻️</div>
            <div className="h-1 w-16 bg-gradient-to-l from-green-500 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Add the Carousel component */}
      <Carousel images={images} />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <ServiceCard
          title="Bin Monitoring"
          description="Real-time monitoring of bin fill levels and collection schedules"
        />
        <ServiceCard
          title="Issue Reporting"
          description="Easy reporting of bin-related issues for quick resolution"
        />
        <ServiceCard
          title="Route Optimization"
          description="Smart route generation for efficient waste collection"
        />
        <ServiceCard
          title="Fleet Management"
          description="Real-time tracking and management of collection trucks"
        />
      </div>
    </div>
  );
}

function ServiceCard({ title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;
