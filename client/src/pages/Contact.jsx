import { useState } from "react";
function Contact(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] =useState("");
    const handleSubmit = (e) => {e.preventDefault();
        if(!name.trim() || !email.trim() || !message.trim() ) {
            alert("please fill all fields");
                return;
        }
            if (!email.includes("@") || !email.includes(".")){
                alert("Please enter a valid email");
                return;
            }
        
          
          const whatsappMessage = `Hello Om Sai Text Chem,
          Name: ${name}
          Email: ${email}
          Message: ${message}`;
          const whatsappURL = `https://wa.me/918591134265?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");

        setName("");
        setEmail("");
        setMessage("");
    };

    return (
    <div className="p-10 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
           <input type="text" 
                 placeholder="Your Name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full border p-3 rounded-lg"/>

            <input  type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded-lg"/>

             <textarea placeholder="Your Message"
                       value={message}
                       maxLength={200}
                       onChange={(e) => setMessage(e.target.value) }
                       className="w-full border p-3 rounded-lg h-32">
                        </textarea>
     
            <p className="text-sm text-gray-500"> Characters: {message.length}/200 Characters</p>
     
              <button type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Send Message</button>                 

        </form>
        <div className="mt-12">
         <iframe 
         title="OM SAi TEX CHEM Location"
         src="https://www.google.com/maps?q=kalwa,Thane,Maharashtra&output=embed"
         width="100%"
         height="400"
         className="rounded-xl shadow-lg"
         loading="lazy"
         ></iframe>
        </div>

        <div className="mt-10 bg0gray-100 p-6 rounded-xl shadow=lg">
            <h2 className="text-2xl font-bold mb-4">Our Office</h2>
            <p><strong>Company:</strong> OM SAI TEX CHEM</p>
            <p><strong>Address:</strong> Mumbai, Maharashtra India</p>
            <p><strong>phone:</strong> +91 9867056341 / +91 8591134265</p>
            <p><strong>Email:</strong> omsaitextflow@gmail.com</p>

            <a
            href="https://maps.google.com/?q=kalwa,Thane,Maharshtra"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Get Direction</a>
        </div>
        
    </div> 
);
}
export default Contact;