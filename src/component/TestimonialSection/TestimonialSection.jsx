'use client'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

const testimonials = [
    {
        name: 'Munir Rasool',
        role: 'CTO at HealthTech',
        image: process.env.NEXT_PUBLIC_TESTIMONIAL_IMAGE_1,
        message:
            'This platform has transformed the way we analyze medical imaging. Truly revolutionary!',
        rating: 5,
    },
    {
        name: 'Naseer Ahmed',
        role: 'Radiologist',
        image: process.env.NEXT_PUBLIC_TESTIMONIAL_IMAGE_1,
        message:
            'The accuracy and speed are unmatched. I can now focus more on diagnosis than data sorting.',
        rating: 4,
    },
    {
        name: 'Tahir Zaman',
        role: 'AI Researcher',
        image: process.env.NEXT_PUBLIC_TESTIMONIAL_IMAGE_1,
        message:
            'A great blend of technology and healthcare. Clean interface and solid performance.',
        rating: 5,
    },
]

export default function TestimonialSection() {
    return (
        <section className="py-16 px-6 lg:px-24 ">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-white">Testimonials</h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white/10 shadow-xl rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
                    >
                        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
                            <Image
                                src={item.image || '/default-avatar.png'}
                                alt={item.name}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <p className="text-sm text-white mb-2">{item.role}</p>
                        <div className="flex mb-2">
                            {Array.from({ length: 5 }).map((_, starIdx) => (
                                <FaStar
                                    key={starIdx}
                                    className={`h-4 w-4 ${starIdx < item.rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-white text-sm italic">“{item.message}”</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
