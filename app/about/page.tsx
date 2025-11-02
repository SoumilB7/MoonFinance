"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page
    router.push("/home");
  }, [router]);

  return null;
}