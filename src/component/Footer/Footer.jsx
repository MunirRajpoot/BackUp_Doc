import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-black text-white px-6 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                {/* Left Menu */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Menu</h2>
                    <ul className="text-sm flex flex-wrap gap-5">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">About</a></li>
                        <li><a href="#" className="hover:underline">Doctor</a></li>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                    </ul>
                    <ul className="text-sm flex flex-wrap gap-5 mt-5">
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms and Conditions</a></li>
                    </ul>
                </div>

                {/* Be In Know Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Be In Know</h2>
                    <p className="text-sm leading-relaxed">
                        We are privileged to work with hundreds of future-thinking medical, including many of the world’s top hardware, software, and brands. Feel safe and comfortable in establishing.
                    </p>
                </div>

                {/* BackUpDoc AI Section */}
                <div className="max-w-md">
                    <h2 className="text-xl font-semibold mb-2">BackUpDoc AI</h2>
                    <p className="text-sm leading-relaxed">
                        We are privileged to work with hundreds of future-thinking medical, including many of the world’s top hardware, software, and brands. Feel safe and comfortable in establishing.
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-6"></div>

            {/* Bottom */}
            <div className="text-center text-xs text-gray-400">
                &copy; 2025 Backupdoc. All rights reserved. <a href="#" className="underline">Privacy and terms</a>
            </div>
        </footer>
    )
}

export default Footer
