import React from 'react';
import shrey from '../../public/shrey.svg'
const Picture = (props) => {
  return (
    <>
    <div className='font-poppins'>
        <img src={props.src} alt="iconhere" className='w-[150px] h-[150px] md:w-[300px] md:h-[300px]'/>
        <p className='text-2xl font-bold md:text-4xl md:text-center md:pt-8 pt-4'>{props.text1}</p>
        <p className='text-lg text-[#ABABAB] md:text-2xl md:text-center'>{props.text2}</p>
    </div>
    </>
  )
}

export default Picture