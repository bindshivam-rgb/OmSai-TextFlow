import { useNavigate } from "react-router-dom";
function Hero({title, subtitle}){
    const navigate = useNavigate()
 return(
    <section className="text=center py-20 px-6">
 <h1 className="text-5xl font-bold">{title}</h1>
            <p className="mt-4 text-gray-600">{subtitle}</p> 
            <div className="mt-8">
                <button onClick={() => navigate("/products")} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Explore Products
                </button>
            </div>
            </section>
 );
}
export default Hero;