import React from 'react';
import Image from 'next/image';
import ecount from '../../public/home/ecount.png';
import microsoft from '../../public/home/microsoft.png';
import vit from '../../public/home/vit.png';

const Recognizition = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#1B1B1B]">
      <h1 className="text-6xl m-20 font-bold">We Are Recognized By</h1>
      <div className="flex flex-row items-center justify-center w-full h-[30vh] space-x-20 pb-20">
        <Image src={microsoft} alt="Recognizition 1" width={350} height={350} className='mt-7'/>
        <Image src={ecount} alt="Recognizition 1" width={200} height={200} />
        <Image src={vit} alt="Recognizition 1" width={350} height={350} />
      </div>
    </div>
  );
};

export default Recognizition;
