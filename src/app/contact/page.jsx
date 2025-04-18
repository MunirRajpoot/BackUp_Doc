import React from 'react'
import { IoIosSend } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
const page = () => {
    return (
        <>
            <section className="min-h-screen text-white px-4 py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
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

                    {/* Right Form */}
                    <form className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-xl space-y-6 border border-white/10">
                        {/* Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition"
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition"
                            />
                            <select className="w-full px-4 py-2 bg-white/10 text-white rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition appearance-none">
                                <option className="bg-[#0e0e1a] text-white">General</option>
                                <option className="bg-[#0e0e1a] text-white">Support</option>
                                <option className="bg-[#0e0e1a] text-white">Sales</option>
                            </select>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition"
                            />
                            <input
                                type="text"
                                placeholder="Company name"
                                className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition"
                            />
                            <select className="w-full px-4 py-2 bg-white/10 text-white rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition appearance-none">
                                <option className="bg-[#0e0e1a] text-white">1-10</option>
                                <option className="bg-[#0e0e1a] text-white">11-50</option>
                                <option className="bg-[#0e0e1a] text-white">51+</option>
                            </select>
                        </div>

                        {/* Textarea */}
                        <textarea
                            placeholder="Enter your questions, feedback or suggestions..."
                            rows="4"
                            className="w-full px-4 py-2 bg-white/10 text-white placeholder-white placeholder-opacity-50 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-#0067FF transition resize-none"
                        ></textarea>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#0067FF] to-[#003E99] text-white font-semibold py-3 rounded-md shadow-lg hover:from-[rgb(6,75,177)] hover:to-[#1971ed] transition cursor-pointer"
                        >
                            Send message
                        </button>
                    </form>

                </div>
            </section>
        </>
    )
}

export default page
