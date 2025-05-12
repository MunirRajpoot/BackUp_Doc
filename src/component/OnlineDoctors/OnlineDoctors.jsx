import useOnlineDoctors from '@/hooks/useOnlineDoctors';

export default function OnlineDoctors() {
    const { onlineDoctors } = useOnlineDoctors();

    return (
        <div className="py-10 px-4 md:px-16 mb-8">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-8">
                Online Dentist Consultation
            </h2>

            <div className="flex flex-wrap justify-start gap-20">
                {onlineDoctors.map((doctor) => (
                    <div key={doctor.id} className="relative w-24 h-24 md:w-28 md:h-28">
                        <img
                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${doctor.profile_url}`}
                            alt={doctor.name}
                            className="rounded-full w-full h-full object-cover border-2 border-white"
                        />
                        {/* Status dot */}
                        <span
                            className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white 
                bg-green-500 }`}
                        ></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// <div className="p-4 border rounded shadow">
//   <h2 className="text-lg font-bold mb-3">Online Doctors</h2>
//   {onlineDoctors.length === 0 ? (
//     <p>No doctors online</p>
//   ) : (
//     <ul className="space-y-2">
//       {onlineDoctors.map((doc) => (
//         <li key={doc._id} className="flex items-center space-x-2">
//           {doc.profile_url && (
//             <img
//               src={doc.profile_url}
//               alt={`${doc.first_name}'s profile`}
//               className="w-8 h-8 rounded-full"
//             />
//           )}
//           <span>{doc.first_name} {doc.last_name}</span>
//         </li>
//       ))}
//     </ul>
//   )}
// </div>