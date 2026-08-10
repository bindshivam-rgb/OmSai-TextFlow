import TestimonialCard from "../components/TestimonialCard";
import Hero from "../components/Hero";
function Home() {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Patel",
      company: "Surat Textiles",
      review: "Excellent quality product and fast delivery.",
      rating: 5,
    },
    {
      id: 2,
      name: "Amit Shah",
      company: "Mumbai Fabrics",
      review: "Very satified with the product quality.",
      rating: 5,
    },
    {
      id: "3",
      name: "Rakesh Jain",
      company: "Ahmedabad Dyeing",
      review: "Reliable service and competitve pricing.",
      rating: 5,
    },

  ];
  return (
    <div className="p-10 text-center">
      <Hero
        title="Welcome to OM SAI TEX CHEM"
        subtitle="High Quality Textile Chemicals" />


      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto py-12 text-center">
        <div className="bg-blue-100 shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-bold text-blue-600">20+</h2>
          <p>Years Experience</p>
        </div>

        <div className="bg-blue-100 shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-bold text-blue-600">500+</h2>
          <p>Happpy Customers</p>
        </div>


        <div className="bg-blue-100 shadow-lg rounded-xl p-6">
          <h2 className="text-3xl font-bold text-blue-600">20+</h2>
          <p>Products</p>
        </div>

        <div className="bg-blue-100 shadow-md rounded-xl p-6">
          <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
          <p>Customer Support</p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <img src="/images/about.jpeg"
            alt="About OM SAI TEX CHEM"
            className="w-full h-[500px] object-cover rounded-2xl shadow-xl" />

          {/*right side*/}

          <div>
            <h2 className="text-4xl font-bold mb-6">About us</h2>
            <p className="text-gray-600 leading-8 mt-6">OM SAI TEX CHEM is a trusted manufacturer of
              premium textile chemical. we specialize in Dye Fixer, Silicone, Softener,
              and other textile processing chemicals with consistent quality and reliable service</p>

            <div className="grid gtid-cols-2 gap-6 mt-8">
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="text-2xl font-bold text-blue-600">Premium</h3>
                <p>Textile Chemicals</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="text-2xl font-bold text-blue-600">100%</h3>
                <p>Quality Products</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="text-2xl font-bold text-blue-600">Quality</h3>
                <p>Assured Manufacturing</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="text-2xl font-bold text-blue-600">500+</h3>
                <p>Satisfied Customers</p>
              </div>


            </div>
            <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
              Contact Us
            </button>

          </div>


        </div>
      </section>

      <section className="bg-gray-100 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Why Choose Us
          </h2>

          <p className="text-center text-gray-600 mt-3">
            We provide premium textile chemicals with trusted quality and reliable service.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-14">

            <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-bold mb-3">
                Premium Quality
              </h3>

              <p className="text-gray-600">
                High quality textile chemicals with consistent performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-bold mb-3">
                Fast Delivery
              </h3>

              <p className="text-gray-600">
                Quick dispatch and on-time delivery across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-bold mb-3">
                Competitive Pricing
              </h3>

              <p className="text-gray-600">
                Best value products at competitive market prices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-bold mb-3">
                Customer Support
              </h3>

              <p className="text-gray-600">
                Dedicated support for all your textile chemical requirements.
              </p>
            </div>

          </div>

        </div>

      </section>
      <section className="py-2 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">Customer Testimonials</h2>
          <p className="text-center text-gray-600 mb-12">What our customer says about us</p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <TestimonialCard
                key={item.id}
                name={item.name}
                company={item.company}
                review={item.review}
                rating={item.rating}
              />

            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;