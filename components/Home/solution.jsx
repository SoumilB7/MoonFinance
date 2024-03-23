import React from 'react';
import Image from 'next/image';
import iPhone from '../../public/home/iPhone.png';

const Solution = () => {
  return (
    <div className="min-h-[55vh] bg-[#0455BF] flex flex-row items-center justify-center">
      <div className="m-10 w-2/3 p-10 pl-[6rem]">
        <h1 className='text-7xl font-bold'>Our Solution</h1>
        <p className='text-3xl my-8'>
            Moon is driven by data-driven algorithms & AI, which tailors your personalized investment portfolios. 
            We simplify financial markets bridging the gap for you to invest. Our platform uses advanced machine learning 
            techniques to analyze market trends and make investment decisions.
        </p></div>
      <div className='w-1/3 py-10 flex flex-row justify-center'>
        <Image src={iPhone} alt='iPhone' width={220} height={220} />
      </div>
    </div>
  );
};

export default Solution;
