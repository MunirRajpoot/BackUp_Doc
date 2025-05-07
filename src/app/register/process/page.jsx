'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm();

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');

    const password = watch('password');
    const confirm_password = watch('confirm_password');

    const checkPasswordStrength = (password) => {
        const minLength = /.{8,}/;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumber = /[0-9]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (
            minLength.test(password) &&
            hasUpperCase.test(password) &&
            hasLowerCase.test(password) &&
            hasNumber.test(password) &&
            hasSpecialChar.test(password)
        ) {
            return 'strong';
        } else if (password.length >= 6) {
            return 'weak';
        } else {
            return 'very weak';
        }
    };

    const checkPasswordMatch = (password, confirm_password) => {
        if (!confirm_password) return '';
        return password === confirm_password ? 'match' : 'mismatch';
    };

    useEffect(() => {
        const m = searchParams.get('m');
        console.log('m', m); // ✅ Logging email from URL

        if (m) {
            setEmail(m);
            setValue('email', m); // Set email in form data
        }
        setPasswordStrength(checkPasswordStrength(password || ''));
        setPasswordMatch(checkPasswordMatch(password || '', confirm_password || ''));
    }, [password, confirm_password, searchParams, setValue]);

    const onSubmit = async (data) => {
        console.log('Form Submitted:', data); // ✅ Logging form data

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/account/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const result = await response.json();
            router.push(`/?email=${encodeURIComponent(data.email || '')}`);
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md overflow-y-auto no-scrollbar">
                <div className="flex flex-col items-center mb-4">
                    <div className="bg-blue-600 text-white p-3 rounded-full">
                        <User size={32} />
                    </div>
                    <h2 className="text-2xl text-black font-semibold mt-2">Register</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Hidden email input */}
                    <input type="hidden" value={email} {...register('email')} />

                    {/* Optional: Show email to user (read-only) */}
                    {/* {email && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
                            />
                        </div>
                    )} */}

                    <div className="flex gap-3">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                {...register('first_name', { required: 'First name is required' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black placeholder:text-gray-400"
                            />
                            {errors.first_name && (
                                <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>
                            )}
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                {...register('last_name', { required: 'Last name is required' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black placeholder:text-gray-400"
                            />
                            {errors.last_name && (
                                <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Your Password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Minimum 6 characters' },
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-2 right-3 text-gray-500"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                        {password && (
                            <p
                                className={`text-sm mt-1 ${passwordStrength === 'strong'
                                    ? 'text-green-600'
                                    : passwordStrength === 'weak'
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                    }`}
                            >
                                Password strength: {passwordStrength}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Your Password"
                                {...register('confirm_password', {
                                    required: 'Confirm your password',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match',
                                })}
                                
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute top-2 right-3 text-gray-500"
                            >
                                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                        {errors.confirm_password && (
                            <p className="text-sm text-red-500 mt-1">{errors.confirm_password.message}</p>
                        )}
                        {confirm_password && (
                            <p
                                className={`text-sm mt-1 ${passwordMatch === 'match' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {passwordMatch === 'match'
                                    ? 'Passwords match'
                                    : 'Passwords do not match'}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center text-sm text-gray-700">
                            <input
                                type="checkbox"
                                {...register('terms', { required: 'You must agree to terms' })}
                                className="mr-2"
                            />
                            I agree to the{' '}
                            <a href="#" className="text-blue-600 hover:underline ml-1">
                                terms and conditions
                            </a>
                        </label>
                        {errors.terms && (
                            <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-blue-600 hover:underline cursor-pointer mt-2">
                        <Link href="/register">Change Email</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
