"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingAnalysis from "../components/LoadingAnalysis";

const AnalysisPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Get the answers from URL params
    const answers = searchParams.get("answers");
    
    if (!answers) {
      // If no answers, redirect back to quiz
      router.push("/quiz");
      return;
    }

    // Set loading duration between 14-20 seconds
    const loadingDuration = 14000 + Math.random() * 6000;

    const timer = setTimeout(() => {
      setLoadingComplete(true);
      // Navigate to the final results page after loading
      router.push(`/results?answers=${answers}`);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  return <LoadingAnalysis duration={17000} />;
};

export default AnalysisPage;
