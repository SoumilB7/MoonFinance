"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { signup } from "@/server/auth/signup";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useAuth } from "@/app/components/AuthProvider";
import { IUser } from "@/server/model/users.model";

const SignUpPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth(); // Access the AuthContext to set the user state

  // Handle manual signup
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const username = formData.get("username") as string | null;
      const phone = formData.get("phone") as string | null;
      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (!username || !phone || !email || !password) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      try {
        const user = await signup({ username, phone, email, password });
        if (user) {
          // Optionally update the user in AuthContext
          setUser(user as IUser); // Assuming `signup` returns user details

          // Redirect to homepage
          router.push("/home");
        }
      } catch (err: any) {
        setError(err.message || "Failed to create account. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Send the user data to your server
      const response = await fetch("/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          userUid: firebaseUser.uid, // Changed from userId to userUid
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process user");
      }

      const data = await response.json();
      setUser(data.user as IUser); // Update the AuthContext with the user
      router.push("/home"); // Redirect to homepage
    } catch (err: any) {
      console.error("Error during Google login:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 h-full">
          <div className="w-full h-full relative">
            <Image
              src="https://res.cloudinary.com/dhrvr4sey/image/upload/v1726863366/signup_d575io.png"
              alt="Sign up illustration"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-5xl font-bold mb-8" style={{ color: "#12C38C" }}>
              Sign up
            </h1>
            <form ref={formRef} onSubmit={handleSignUp} className="text-black">
              <div className="mb-4">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#12C38C]"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#12C38C]"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#12C38C]"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#12C38C]"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#12C38C] text-white py-3 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center space-x-4">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="p-2 border rounded-full hover:border-[#12C38C] transition-all"
              >
                <Image
                  src="https://res.cloudinary.com/dhrvr4sey/image/upload/v1726862669/google_oag3xu.png"
                  alt="Google logo"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <p className="text-center mt-6 text-black">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-[#12C38C] hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
