"use client"

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const response = await fetch('/api/auth/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userCredential.user.email,
            name: userCredential.user.displayName,
            userUid: userCredential.user.uid,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to process user');
        }

        router.push('/dashboard'); // Replace with your redirect path
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const response = await fetch('/api/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          userUid: result.user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process user');
      }

      router.push('/dash'); // Replace with your redirect path
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-1">
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-6xl font-bold mb-8 text-[#12C38C]">Welcome!</h1>
          
          <form ref={formRef} onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <input
                name="email"
                type="email"
                placeholder="Please enter your email here."
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#12C38C]"
                required
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#12C38C]"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#12C38C] text-white p-3 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'LOGIN'}
            </button>
          </form>

          <Link href="/forgot-password" className="text-center block mt-4 text-[#12C38C]">
            Forgot Password?
          </Link>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <p className="text-center mb-4 text-black">Continue with</p>
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="p-2 border rounded-full hover:border-[#12C38C] transition-all"
            >
              <Image
                src="https://res.cloudinary.com/dhrvr4sey/image/upload/v1726862669/google_oag3xu.png"
                alt="Google"
                width={24}
                height={24}
              />
            </button>

            {/* <button className="p-2 border rounded-full hover:border-[#12C38C] transition-all">
              <Image
                src="https://res.cloudinary.com/dhrvr4sey/image/upload/v1726862669/mail_ryfif4.png"
                alt="Mail"
                width={24}
                height={24}
              />
            </button> */}
          </div>

          <p className="text-center text-black">
            Don&#39;t have an account?{' '}
            <Link href="/signup" className="text-[#12C38C] hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 bg-[#12C38C] items-center justify-center p-8">
          <div className="w-full max-w-xl">
            <Image
              src="https://res.cloudinary.com/dhrvr4sey/image/upload/v1726865117/login_kjpjnz.png"
              alt="Business growth illustration"
              width={1024}
              height={512}
              layout="responsive"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;