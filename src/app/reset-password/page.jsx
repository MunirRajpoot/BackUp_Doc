'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const uidParam = searchParams.get('uuid');
        const tokenParam = searchParams.get('SIDToken');

        if (!uidParam || !tokenParam) {
            alert('Invalid or expired reset link.');
            router.push('/login');
        } else {
            setUid(uidParam);
            setToken(tokenParam);
        }
    }, [searchParams, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            alert('Please fill in both password fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/account/request-confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid,
                    token,
                    new_password: newPassword,
                    confirm_password: confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Password reset successful. Please log in.');
                router.push('/login');
            } else {
                alert(data.detail || 'Failed to reset password. Try again.');
            }
        } catch (error) {
            console.error('Reset error:', error);
            alert('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-start h-screen overflow-y-auto pt-8">
            <div className="flex flex-col items-center bg-white text-black w-full max-w-md p-8 rounded-xl shadow-md">
                <h2 className="text-center mb-4 text-xl font-semibold">Reset Password</h2>
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="newPassword" className="block mb-1 font-medium">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
