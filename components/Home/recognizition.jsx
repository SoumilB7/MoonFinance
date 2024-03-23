import React from 'react';
import Image from 'next/image';
import ecount from '../../public/home/ecount.png';
import microsoft from '../../public/home/microsoft.png';
import vit from '../../public/home/vit.png';

const Recognizition = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#1B1B1B]">
      <h1 className="text-4xl md:text-6xl m-10 md:m-20 font-bold">We Are Recognized By</h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full md:h-[30vh] h-[75vh] md:space-x-20 pb-20">
        <Image src={microsoft} alt="Recognizition 1" width={200} height={200} className='mt-7 md:mt-0'/>
        <Image src={ecount} alt="Recognizition 2" width={150} height={150} className='mt-7 md:mt-0'/>
        <Image src={vit} alt="Recognizition 3" width={200} height={200} className='mt-7 md:mt-0'/>
      </div>
    </div>
  );
};

export default Recognizition;