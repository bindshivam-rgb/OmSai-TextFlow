
function TestimonialCard ({ name, company, review, rating})
{ 
    
    return( 
        <div className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl 
        transition-duration-300">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-blue-600">{company}</p>
            <p className="mt-4 text-gray-600">"{review}"</p>
            <p className="mt-4 text-yellow-500">{"★".repeat(rating)}</p>
        </div>

        
    );
}
export default  TestimonialCard;