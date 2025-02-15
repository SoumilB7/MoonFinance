
// signup/otp/page.tsx

"use client"
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';

export default function PhoneVerification() {
  const { signUp, isLoaded } = useSignUp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationStep, setVerificationStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const startPhoneVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!signUp) throw new Error("SignUp not initialized");
      await signUp.create({
        phoneNumber
      });
      await signUp.preparePhoneNumberVerification();
      setVerificationStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!signUp) throw new Error("SignUp not initialized");
      const result = await signUp.attemptPhoneNumberVerification({
        code,
      });
      if (result.status === "complete") {
        const completeSignUp = await signUp.create({
          phoneNumber
        });
        if (completeSignUp.status === "complete") {
          router.push("/dash");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true);
    setError("");
    try {
      if (!signUp) throw new Error("SignUp not initialized");
      await signUp.preparePhoneNumberVerification();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend code");
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
            <h1 className="text-5xl font-bold mb-8" style={{ color: '#12C38C' }}>
              {verificationStep === "phone" ? "Phone Verification" : "Enter Code"}
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {verificationStep === "phone" ? (
              <form onSubmit={startPhoneVerification} className="text-black">
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number:</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1234567890"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !isLoaded}
                  className="w-full text-white py-2 rounded-md transition duration-300"
                  style={{ backgroundColor: '#12C38C' }}
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Verification Code:</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter verification code"
                    required
                  />
                </div>
                <button
                  onClick={verifyCode}
                  className="w-full text-white py-2 rounded-md transition duration-300"
                  style={{ backgroundColor: '#12C38C' }}
                  disabled={loading || !isLoaded}
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>
                <button
                  onClick={resendCode}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition duration-300"
                  disabled={loading}
                >
                  Resend Code
                </button>
                <button
                  onClick={() => setVerificationStep("phone")}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition duration-300"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

