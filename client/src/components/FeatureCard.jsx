import { useState } from "react";

function FeatureCard(props) {
  const [loading, setLoading] = useState(false);

  const handleQuote = () => {
    setLoading(true);

    const message = `Hello OM SAI TEX CHEM,
I want a quotation for ${props.title}.
Please share the price and details.`;

    const whatsappURL = `https://wa.me/918591134265?text=${encodeURIComponent(
      message
    )}`;

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className="w-80 bg-white rounded-xl shadow-lg overflow-hidden
      hover:shadow-2xl hover:scale-105 transition duration-300"
    >
      <img
        src={props.image}
        alt={props.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5 flex flex-col">
        <h3 className="text-2xl font-bold">
          {props.title}
        </h3>

        <p className="mt-3 text-gray-600">
          {props.description}
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-semibold">Stock:</span>{" "}
            {props.packaging}
          </p>

          <p>
            <span className="font-semibold">Category:</span>{" "}
            {props.application}
          </p>

          <p>
            <span className="font-semibold">Price:</span>{" "}
            {props.features}
          </p>
        </div>

        <div className="mt-auto pt-5 space-y-3">
          <button
            onClick={props.onView}
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            View Details
          </button>

          <button
            onClick={handleQuote}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Opening WhatsApp..." : "Request Quote"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
