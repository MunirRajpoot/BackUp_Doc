import React from 'react'

const SidebarToggleButton = ({setToggleSideBar}) => {
    return (
        <div className="md:hidden fixed top-4 left-4 z-50">
            <button
                onClick={setToggleSideBar(true)}
                className="p-2 rounded-full bg-[#1976D2] text-white shadow-lg"
                aria-label="Open Sidebar"
            >
                <FaArrowRight className="w-5 h-5" />
            </button>
        </div>


    )
}

export default SidebarToggleButton
