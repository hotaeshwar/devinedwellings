import { useState } from 'react';
import { MapPin, Home, Briefcase, Phone, Mail } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        budget: '',
        location: '',
        message: '',
        document: null
    });

    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'document' && files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a hidden form element for FormSubmit
        const formElement = document.createElement('form');
        formElement.action = 'https://formsubmit.co/divinedwellings2025@gmail.com';
        formElement.method = 'POST';
        formElement.style.display = 'none';

        // Prepare form data for submission
        const submissionData = {
            'Name': formData.name,
            'Email': formData.email,
            'Phone': formData.phone,
            'Property Type': formData.propertyType,
            'Budget': formData.budget,
            'Preferred Location': formData.location,
            'Message': formData.message,
            '_subject': 'New Property Inquiry - Divine Dwellings',
            '_replyto': formData.email,
            '_captcha': 'false',
            '_template': 'table'
        };

        // Add all form fields as hidden inputs
        Object.keys(submissionData).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = submissionData[key];
            formElement.appendChild(input);
        });

        // Handle file upload if document is selected
        if (formData.document) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.name = 'attachment';
            fileInput.style.display = 'none';
            
            // Create a new FileList with the selected file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(formData.document);
            fileInput.files = dataTransfer.files;
            
            formElement.appendChild(fileInput);
        }

        // Append form to body and submit
        document.body.appendChild(formElement);
        formElement.submit();

        // Show success message
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        
        // Reset form data
        setFormData({
            name: '',
            email: '',
            phone: '',
            propertyType: '',
            budget: '',
            location: '',
            message: '',
            document: null
        });
    };

    return (
        <div className="relative w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="container mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 lg:gap-16">
                    {/* Left side content */}
                    <div className="w-full lg:w-1/2 text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-yellow-400 underline decoration-yellow-400">
                            Find Your Dream Property
                        </h2>
                        <p className="text-sm sm:text-base mb-4 sm:mb-6 text-yellow-300 opacity-90">
                            Divine Dwellings is your trusted partner in finding the perfect property. 
                            With years of experience in real estate, we specialize in residential and 
                            commercial properties that match your lifestyle and investment goals.
                        </p>

                        <div className="mb-4 sm:mb-6">
                            <div className="flex items-center text-sm sm:text-base font-medium text-yellow-400 mb-2">
                                <MapPin className="w-4 h-4 mr-2" />
                                Premium Properties Available
                            </div>
                            <div className="flex items-center text-sm sm:text-base font-medium text-yellow-400 mb-2">
                                <Home className="w-4 h-4 mr-2" />
                                Residential & Commercial
                            </div>
                            <div className="flex items-center text-sm sm:text-base font-medium text-yellow-400 mb-2">
                                <Briefcase className="w-4 h-4 mr-2" />
                                Investment Opportunities
                            </div>
                            <div className="flex items-center text-sm sm:text-base font-medium text-yellow-400">
                                <Phone className="w-4 h-4 mr-2" />
                                Consultation Available
                            </div>
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <div className="flex items-center text-base sm:text-lg font-semibold text-yellow-400 mb-2">
                                <Mail className="w-5 h-5 mr-2" />
                                Contact Us:
                            </div>
                            <a
                                href="mailto:divinedwellings2025@gmail.com"
                                className="text-sm sm:text-base transition duration-300 text-yellow-300 hover:text-yellow-400 ml-7"
                            >
                                divinedwellings2025@gmail.com
                            </a>
                        </div>

                        {/* Property features */}
                        <div className="mt-6 sm:mt-8 hidden lg:block">
                            <div className="bg-black rounded-lg shadow-lg p-6 border border-yellow-600">
                                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Why Choose Us?</h3>
                                <ul className="space-y-2 text-sm text-yellow-300">
                                    <li className="flex items-center">
                                        <span className="text-yellow-400 mr-2">✓</span>
                                        Expert property consultation
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-yellow-400 mr-2">✓</span>
                                        Prime location properties
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-yellow-400 mr-2">✓</span>
                                        Flexible payment options
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-yellow-400 mr-2">✓</span>
                                        24/7 customer support
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right side form */}
                    <div className="w-full lg:w-1/2 bg-black bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 mt-6 lg:mt-0 border border-yellow-600">
                        <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center underline decoration-yellow-400">
                            Get Property Information
                        </h3>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 sm:mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-600 bg-gray-800 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 placeholder-gray-400"
                                />
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-600 bg-gray-800 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 placeholder-gray-400"
                                />
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-600 bg-gray-800 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 placeholder-gray-400"
                                />
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-600 bg-gray-800 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                                >
                                    <option value="" className="bg-gray-800">Select Property Type</option>
                                    <option value="apartment" className="bg-gray-800">Apartment</option>
                                    <option value="villa" className="bg-gray-800">Villa</option>
                                    <option value="house" className="bg-gray-800">Independent House</option>
                                    <option value="plot" className="bg-gray-800">Plot/Land</option>
                                    <option value="commercial" className="bg-gray-800">Commercial Space</option>
                                    <option value="office" className="bg-gray-800">Office Space</option>
                                </select>
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <select
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-600 bg-gray-800 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                                >
                                    <option value="" className="bg-gray-800">Select Budget Range</option>
                                    <option value="under-50L" className="bg-gray-800">Under ₹50 Lakhs</option>
                                    <option value="50L-1Cr" className="bg-gray-800">₹50 Lakhs - 1 Crore</option>
                                    <option value="1Cr-2Cr" className="bg-gray-800">₹1 - 2 Crores</option>
                                    <option value="2Cr-5Cr" className="bg-gray-800">₹2 - 5 Crores</option>
                                    <option value="above-5Cr" className="bg-gray-800">Above ₹5 Crores</option>
                                </select>
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Preferred Location"
                                    required
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-600 bg-gray-800 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 placeholder-gray-400"
                                />
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Additional Requirements or Message"
                                    rows="4"
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-600 bg-gray-800 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300 placeholder-gray-400"
                                ></textarea>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <p className="mb-1 sm:mb-2 text-sm sm:text-base text-yellow-400 font-medium">
                                    Attach Document (Optional)
                                </p>
                                <input
                                    type="file"
                                    name="document"
                                    onChange={handleChange}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    className="w-full p-1 sm:p-2 text-sm sm:text-base border border-gray-600 bg-gray-800 text-yellow-300 rounded-lg file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:bg-yellow-400 file:text-black file:text-sm sm:file:text-base file:hover:bg-yellow-500 transition duration-300"
                                />
                            </div>

                            <button
                                type="submit"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base text-black text-center cursor-pointer transition-all duration-500 ease-in-out transform bg-yellow-400 hover:bg-yellow-500 hover:scale-105 hover:shadow-xl"
                                style={{
                                    boxShadow: isHovered ? '0 10px 25px rgba(250, 204, 21, 0.3)' : 'none'
                                }}
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>

                {/* Mobile features */}
                <div className="mt-8 sm:mt-10 md:mt-12 lg:hidden">
                    <div className="bg-black rounded-lg shadow-lg p-6 border border-yellow-600">
                        <h3 className="text-xl font-semibold text-yellow-400 mb-4 text-center">Why Choose Divine Dwellings?</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-yellow-300">
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-2">✓</span>
                                Expert Consultation
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-2">✓</span>
                                Prime Locations
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-2">✓</span>
                                Flexible Payments
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-2">✓</span>
                                24/7 Support
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;