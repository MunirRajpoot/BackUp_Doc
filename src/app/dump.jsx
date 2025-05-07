 // <div className="p-6 flex flex-col md:flex-row gap-6 pt-[100px]">
        //     {/* Left: Upload Section */}
        //     <div className="flex-1 bg-white rounded-2xl min-h-[400px] shadow-sm flex items-center justify-center p-6 ">
        //         <div className="text-center  ">
        //             {previewUrl ? (
        //                 <img src={previewUrl} alt="Uploaded" className="max-h-64 mx-auto rounded-lg" />
        //             ) : (
        //                 <>
        //                     <div
        //                         className="text-5xl mb-4 flex justify-center items-center text-blue-600 cursor-pointer"
        //                         onClick={handleClick}
        //                     >
        //                         <IoCloudUpload />
        //                     </div>
        //                     <p className="text-sm mb-2">
        //                         Drag and drop an image here or{' '}
        //                         <span
        //                             className="text-blue-600 font-semibold cursor-pointer"
        //                             onClick={handleClick}
        //                         >
        //                             click to upload
        //                         </span>
        //                     </p>
        //                     <input
        //                         type="file"
        //                         accept="image/*"
        //                         className="hidden"
        //                         ref={fileInputRef}
        //                         onChange={handleFileChange}
        //                     />
        //                     <p className="text-blue-600 font-semibold">Or</p>
        //                     <p className="italic text-sm mt-1 text-gray-500">
        //                         Copy and Paste an Image<br />
        //                         <span className="text-gray-400">Press C + V</span>
        //                     </p>
        //                 </>
        //             )}
        //         </div>
        //     </div>


        //     {/* Right: Sidebar */}
        //     <div className="w-full md:w-[350px]  rounded-lg  flex flex-col justify-between ">
        //         <div className='bg-white rounded-2xl p-6 min-h-[50px] border shadow-sm'>
        //             <h2 className="text-lg font-semibold mb-4">
        //                 Hi! <span className="font-bold">Usman Tahir</span>
        //             </h2>
        //             <div>
        //                 <p className="text-sm text-gray-600 mb-2">Analyze X-Ray</p>
        //                 <button className="bg-blue-600 text-white font-medium py-2 rounded-lg w-full hover:bg-blue-500 transition cursor-pointer">
        //                     Start Process
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="content-wrapper">
        {/* Header Section */}
        <div className="text-box">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Get precise results <br />
            <span className="block mt-1">effortlessly with</span>
          </h1>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#0067FF] to-[#A5C9FF] text-transparent bg-clip-text mt-2">
            BackUpDoc
          </h1>

          <div className="text-description">
            <p className="text-white text-sm md:text-base">
              Empowering dentists to provide trustworthy care, enhance patient
              understanding, and increase retention through AI-supported
              diagnostics.
            </p>
          </div>

          <div className="button-wrapper">
            <button className="custom-button">Get Started</button>
            <button className="custom-button flex items-center gap-2">
              <CiPlay1 className="text-lg" /> See Demo
            </button>
          </div>
        </div>

        {/* Appointment Section */}
        <div className="appointment-box flex flex-col md:flex-row justify-center items-center w-full px-10 py-20 gap-10 mb-10">
          {/* Image and overlapping card */}
          <div className="relative w-full md:w-1/2 flex justify-center z-40">

            {/* Half Circle Shape Behind */}
            <div className="absolute top-7 left-0 w-[150px] h-[300px] overflow-hidden z-10">
              <div className="w-[300px] h-[300px]">
                <Image
                  src="/images/Ellipse 1.png"
                  alt="half-circle-shape"
                  width={200}
                  height={200}
                />
              </div>
            </div>

            {/* Doctor Image (in front of the half-circle) */}
            <Image
              src="/images/app_img.png"
              alt="Appointment"
              width={400}
              height={400}
              priority
              className="rounded-xl z-30 relative"
            />

            {/* Overlapping Card (on top) */}
            <div className="absolute -bottom-30 -right-10 bg-white rounded-xl shadow-lg p-5 w-80 z-40">
              <h3 className="font-bold text-lg text-black">Lorem Ipsum</h3>
              <p className="text-sm text-black mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>

            {/* Pyramid Shape */}
            <div className="absolute -bottom-35 left-10 w-30 h-30 rounded-full transform z-20">
              <Image src="/images/pyramid.png" alt="pyramid-shape" height={300} width={300} />
            </div>

          </div>


          {/* Text section */}
          <div className="w-full md:w-1/2 text-white mb-auto text-left">
            <p className="text-lg font-semibold">Appointment</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0067FF] py-5">
              Meet Our Specialist This
              <span className="block">Doctor Meeting</span>
            </h2>
            <p className="pb-5 text-1xl text-gray-200 max-w-90">
              We are privileged to work with hundreds of future-thinking medical
              professionals, including many of the world’s top hardware and software brands.
              Feel safe and comfortable establishing care with us.
            </p>
            <button className="bg-[#0067FF] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition mt-4">
              Book Now
            </button>
          </div>
        </div>




        {/* Choose Us */}

        <section className="text-white py-16 px-4 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Text Section */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h4 className="text-lg font-semibold mb-5 text-start">Chose Us</h4>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0067FF] mb-5 text-start">Why Choose Us?</h2>
                <p className="text-1xl text-gray-200 mb-10 text-start">
                  We are privileged to work with hundreds of future-thinking medical,
                  including many of the world’s top hardware, software, and brands. Feel
                  safe and comfortable in establishing.
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-35 rounded-xl bg-white/10 flex items-center justify-center text-gray-300 text-lg font-medium shadow-md hover:shadow-lg transition-shadow"
                  >
                    Feature {idx + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center items-center h-full mt-4">
              <Image
                src="/images/image 6.png"
                alt="Doctors Group"
                className="max-w-full h-auto object-contain"
                width={500}
                height={550}
                priority
              />
            </div>
          </div>
        </section>


        <div className="text-center px-4 py-12">
          <p className="text-3xl font-bold mb-8">Get precise results effortlessly with</p>

          <ImageComparisonSlider />
        </div>

        {/* Testimonial Section */}
        <TestimonialSection />

      </div>
