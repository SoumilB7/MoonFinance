import React from 'react';
import Image from 'next/image';
import ecount from '../../public/home/ecount.svg';
import microsoft from '../../public/home/microsoft.svg';
import vit from '../../public/home/vit.svg';

const Recognizition = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#1B1B1B]">
      <h1 className="text-4xl lg:text-6xl md:text-5xl m-10 lg:m-20 font-bold">We Are Recognized By</h1>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:h-[30vh] h-[90vh] md:h-[70vh] lg:space-x-20 pb-20">
        <Image src={microsoft} alt="Recognizition 1" width={300} height={300} className='mt-7 lg:mt-0'/>
        <Image src={ecount} alt="Recognizition 2" width={250} height={250} className='mt-7 lg:mt-0'/>
        <Image src={vit} alt="Recognizition 3" width={300} height={300} className='mt-7 lg:mt-0'/>
      </div>
    </div>
  );
};

export default Recognizition;