import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

function Home() {
  const images = [
    "https://img.freepik.com/free-photo/men-women-help-each-other-collect-garbage_1150-23957.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/recycle-concept-with-woman-collecting-trash_23-2147825504.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/group-activists-friends-collecting-plastic-waste-park-environmental-conservation_1153-4196.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/group-volunteers-collecting-trash-beach-with-teamwork-concept_23-2147827058.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/save-world-ecology-environmental-conservation-perforated-paper-recycle_53876-31051.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/man-wearing-orange-gloves-collecting-garbage-black-bag_1150-23946.jpg?uid=R174306422&ga=GA1.1.1146274258.1731729080&semt=ais_hybrid",
  ];

  return (
    <>
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

        {/* Waste Segregation Guide Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Waste Segregation Guide
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WasteGuideCard
              title="Wet Waste"
              items={[
                "Kitchen waste",
                "Leftover food",
                "Fruit and vegetable peels",
                "Tea bags and coffee grounds",
                "Meat and fish scraps",
                "Garden waste",
              ]}
              color="green"
            />
            <WasteGuideCard
              title="Dry Waste"
              items={[
                "Paper and cardboard",
                "Plastic containers",
                "Glass bottles",
                "Metal cans",
                "Packaging material",
                "Clothes and textiles",
              ]}
              color="yellow"
            />
            <WasteGuideCard
              title="Hazardous Waste"
              items={[
                "Batteries",
                "Electronics",
                "Chemicals",
                "Medical waste",
                "Paint cans",
                "Aerosol cans",
              ]}
              color="red"
            />
          </div>
        </section>

        {/* Recycling Tips Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Recycling Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-eco-green-50 to-eco-green-100/50 
              rounded-lg shadow-md p-6 
              border border-eco-green-100
              hover:from-eco-green-100 hover:to-eco-green-200/50 
              hover:shadow-lg hover:scale-[1.01]
              transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Do's</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Clean containers before recycling
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Flatten cardboard boxes
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Remove caps from bottles
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Separate different types of materials
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Check local recycling guidelines
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-eco-green-50 to-eco-green-100/50 
              rounded-lg shadow-md p-6 
              border border-eco-green-100
              hover:from-eco-green-100 hover:to-eco-green-200/50 
              hover:shadow-lg hover:scale-[1.01]
              transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Don'ts
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">✗</span>
                  Mix different types of waste
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">✗</span>
                  Recycle contaminated items
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">✗</span>
                  Include plastic bags in recycling
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">✗</span>
                  Throw hazardous waste in regular bins
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">✗</span>
                  Ignore sorting guidelines
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Environmental Impact Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Environmental Impact
          </h2>
          <div className="bg-gradient-to-br from-eco-green-50 to-eco-green-100/50 
            rounded-lg shadow-md p-8 
            border border-eco-green-100">
            <div className="grid md:grid-cols-3 gap-6">
              <ImpactCard
                title="Reduced Landfill"
                value="30%"
                description="Less waste sent to landfills through proper segregation"
              />
              <ImpactCard
                title="Carbon Reduction"
                value="25%"
                description="Decrease in carbon emissions from waste transport"
              />
              <ImpactCard
                title="Recycling Rate"
                value="40%"
                description="Increase in materials successfully recycled"
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function ServiceCard({ title, description }) {
  return (
    <div className="bg-gradient-to-br from-eco-green-50 to-eco-green-100/50 
      rounded-lg shadow-md p-6 
      border border-eco-green-100
      hover:from-eco-green-100 hover:to-eco-green-200/50 
      hover:shadow-lg hover:scale-[1.02]
      transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function WasteGuideCard({ title, items, color }) {
  const colorClasses = {
    green: "border-green-500 bg-gradient-to-br from-eco-green-50 to-eco-green-100/50",
    yellow: "border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100/50",
    red: "border-red-500 bg-gradient-to-br from-red-50 to-red-100/50",
  };

  return (
    <div className={`rounded-lg shadow-md p-6 border-l-4 
      ${colorClasses[color]}
      hover:shadow-lg hover:scale-[1.01]
      transition-all duration-300`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 flex items-center">
            <span className="mr-2">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImpactCard({ title, value, description }) {
  return (
    <div className="text-center p-4 
      bg-white/50
      rounded-lg border border-eco-green-100
      hover:bg-white/70
      hover:shadow-lg hover:scale-[1.02]
      transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-4xl font-bold text-green-600 mb-2">{value}</div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;
