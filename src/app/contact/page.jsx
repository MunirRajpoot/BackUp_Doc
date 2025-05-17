"use client"
import React from 'react'
import { useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";

const page = () => {
    const [openIndex, setOpenIndex] = useState(null);
    // Form input state
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        subject: "General",
        email: "",
        company_name: "",
        employee_number: "1-10",
        message: "",
    });

    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/account/tickets/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.detail || "Failed to submit the contact ticket.");
            }

            // Success message
            setStatusMessage("Your message has been sent successfully.");
            // Reset form
            setFormData({
                first_name: "",
                last_name: "",
                subject: "General",
                email: "",
                company_name: "",
                employee_number: "1-10",
                message: "",
            });
        } catch (error) {
            setStatusMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };




    const faqList = [
        {
            question: 'Is there a free trial available?',
            answer:
                "Yes, we have a free version of Untitled UI available for you to try out! It's an incredibly powerful and large UI kit for Figma. You can duplicate and use it in as many projects as you'd like.",
        },
        {
            question: 'What does the free version include?',
            answer: 'The free version includes a selection of the full UI kit components and templates.',
        },
        {
            question: 'Do you have an affiliate program?',
            answer: 'Yes, we do have an affiliate program. Reach out to our team for more details!',
        },
        {
            question: 'Do I need to know how to use Figma?',
            answer: 'Not at all! Our UI kit is beginner-friendly and comes with full documentation.',
        },
        {
            question: 'Do I need to pay for Figma?',
            answer: 'Figma offers a free plan you can use. Paid plans unlock more features, but the free one is good to start!',
        },
        {
            question: 'Is there a version for Sketch or XD?',
            answer: 'Currently, the UI kit is only available for Figma.',
        },
    ];

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <section className="min-h-screen text-white px-4 py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mt-20 ">
                    {/* Left Content */}
                    <div>
                        <button className="bg-white/10 flex gap-1 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-md hover:bg-white/20 transition">
                            <IoIosSend className='mt-0.5' /> Contact us
                        </button>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in touch</h2>
                        <p className="text-gray-300 mb-6 text-lg">
                            Please feel free to send us any questions, feedback or suggestions you might have.
                        </p>
                        <ul className="space-y-3 text-lg text-gray-300">
                            <li className='flex gap-2'><AiFillCheckCircle className='mt-1' /> Secure an appointment to talk to our sales reps.</li>
                            <li className='flex gap-2'><AiFillCheckCircle className='mt-1' />  Learn which plan is right for your team.</li>
                            <li className='flex gap-2'><AiFillCheckCircle className='mt-1' />  Request a demo or get onboarding help.</li>
                        </ul>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-xl space-y-6 border border-white/10"
                    >
                        {/* Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First name"
                                required
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition"
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last name"
                                required
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition"
                            />
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-white/10 text-white rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition appearance-none"
                            >
                                <option className="bg-[#0e0e1a] text-white">General</option>
                                <option className="bg-[#0e0e1a] text-white">Support</option>
                                <option className="bg-[#0e0e1a] text-white">Sales</option>
                            </select>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition"
                            />
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                placeholder="Company name"
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition"
                            />
                            <select
                                name="employee_number"
                                value={formData.employee_number}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-white/10 text-white rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition appearance-none"
                            >
                                <option className="bg-[#0e0e1a] text-white">1-10</option>
                                <option className="bg-[#0e0e1a] text-white">11-50</option>
                                <option className="bg-[#0e0e1a] text-white">51+</option>
                            </select>
                        </div>

                        {/* Textarea */}
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your questions, feedback or suggestions..."
                            rows="4"
                            required
                            className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition resize-none"
                        ></textarea>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#0067FF] to-[#003E99] text-white font-semibold py-3 rounded-md shadow-lg hover:from-[rgb(6,75,177)] hover:to-[#1971ed] transition cursor-pointer"
                        >
                            {isSubmitting ? "Sending..." : "Send message"}
                        </button>

                        {/* Status Message */}
                        {statusMessage && (
                            <p className="text-sm text-white mt-2 text-center">{statusMessage}</p>
                        )}
                    </form>

                </div>

                {/* Frequently Asked Questions */}
                <div className="flex flex-col md:flex-row gap-10 p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 w-full mt-16 max-w-6xl mx-auto">
                    {/* Left Section */}
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
                        <p className="text-gray-300 text-lg">
                            Everything you need to know about the product and how it works. Can't find an answer?{' '}
                            <a href="#" className="text-blue-400 underline hover:text-blue-500 transition">Chat with our friendly team</a>.
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="md:w-1/2 flex flex-col space-y-4">
                        {faqList.map((faq, index) => (
                            <div
                                key={index}
                                className={`border border-white/10 rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white/10' : 'bg-white/5'}`}
                            >
                                <div
                                    className="flex justify-between items-center cursor-pointer px-6 py-4 hover:bg-white/10 transition"
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <h4 className="text-lg font-semibold text-white">{faq.question}</h4>
                                    <span className="text-2xl text-blue-400">{openIndex === index ? '−' : '+'}</span>
                                </div>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 text-gray-300 ${openIndex === index ? 'max-h-40 py-4' : 'max-h-0'
                                        }`}
                                >
                                    {openIndex === index && (
                                        <p className="text-base leading-relaxed">{faq.answer}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
