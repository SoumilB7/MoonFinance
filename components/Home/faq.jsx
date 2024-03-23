import React from 'react'

const Faq = () => {
  return (
    <div className='bg-[#E6E6E6] flex flex-row items-center justify-center p-10'>
      <div className='flex flex-col justify-center items-beggining w-1/2 m-10 p-10'>
        <p className='text-4xl text-black font-bold'>-FAQ&apos;S</p>
        <h1 className='text-8xl text-black font-extrabold'>Questions ?? Look Here.</h1>
      </div>
      <div className='flex flex-col items-start justify-center w-1/2 p-20 space-y-5'>
        <details className='text-black text-xl font-semibold w-full'>
          <summary className='list-none'>How does MoonFinance Work? <span className='float-right'>&gt;</span></summary>
          <p className='text-black text-lg'>MoonFinance works by using advanced algorithms and AI to tailor personalized investment portfolios.</p>
        </details>
        <div className='border-t border-black w-full'/>
        <details className='text-black text-xl font-semibold w-full'>
          <summary className='list-none'>Why should I use MoonFinance? <span className='float-right'>&gt;</span></summary>
          <p className='text-black text-lg'>MoonFinance works by using advanced algorithms and AI to tailor personalized investment portfolios.</p>
        </details>
        <div className='border-t border-black w-full'/>
        <details className='text-black text-xl font-semibold w-full'>
          <summary className='list-none'>How is my money invested? <span className='float-right'>&gt;</span></summary>
          <p className='text-black text-lg'>MoonFinance works by using advanced algorithms and AI to tailor personalized investment portfolios.</p>
        </details>
        <div className='border-t border-black w-full'/>
        <details className='text-black text-xl font-semibold w-full'>
          <summary className='list-none'>Where is my money invested? <span className='float-right'>&gt;</span></summary>
          <p className='text-black text-lg'>MoonFinance works by using advanced algorithms and AI to tailor personalized investment portfolios.</p>
        </details>
        <div className='border-t border-black w-full'/>
        <details className='text-black text-xl font-semibold w-full'>
          <summary className='list-none'>Is my money safe with MoonFinance? <span className='float-right'>&gt;</span></summary>
          <p className='text-black text-lg'>MoonFinance works by using advanced algorithms and AI to tailor personalized investment portfolios.</p>
        </details>
        <div className='border-t border-black w-full'/>
      </div>
    </div>
  )
}

export default Faq
