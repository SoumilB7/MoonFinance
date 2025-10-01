import React from 'react';
import Image from 'next/image';
import image30 from "@/app/assets/image 30.png";
import image32 from "@/app/assets/image 32.png";
import NSRCEL from "@/app/assets/NSRCEL Main logo 1.png";

interface RecognitionItem {
  name: string;
  logo: React.ReactNode;
}

const Recognitions: React.FC = () => {
  const recognitions: RecognitionItem[] = [
    { name: 'VIT', logo: <Image src="/assets/vit.svg" alt="VIT Logo" width={128} height={128} /> },
    { name: 'IIM Bangalore', logo: <Image src="/assets/nsrcel.webp" alt="NSRCEL Logo" width={128} height={128} className="grayscale" /> },
    { name: 'MEITY', logo: <Image src="/assets/meity1.svg" alt="MEITY Logo" width={100} height={100} className="grayscale contrast-150 brightness-75" /> },
    { name: 'MEITY', logo: <Image src="/assets/meity2.svg" alt="MEITY Logo" width={80} height={80} className="grayscale" /> },
  ];

  return (
    <div className="bg-white py-16 px-6">
      <h2 className="text-center text-3xl font-semibold text-gray-800 mb-12">We Are Recognized by</h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {recognitions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-4 shadow-lg rounded-lg bg-gray-100 w-[180px] h-[180px]"
          >
            {item.logo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recognitions;
