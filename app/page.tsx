// app/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /home
    router.push("/home");
  }, [router]);

  return null;
};

export default App;
