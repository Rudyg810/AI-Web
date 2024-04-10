import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Search } from '@/components/Search'

export default function UrlProcess() {
  return (

<div>
  <MaxWidthWrapper className="mb-5 mt-2 sm:mt-20 flex flex-wrap flex-col items-center text-center justify-center relative">
    {/* Hexagon shape */}
    <div
      className="absolute  sm:-top- -top- sm:-left-40 -left-5 w-16 h-16"
    >
<img src="https://img.icons8.com/ios/100/FD7E14/benzene-ring.png" alt="benzene-ring"/> 
   </div>
   <div
      className="absolute sm:-top-20 -top-5 sm:-right-40 -right-10 w-16 h-16"
    >
<img width="100" height="100" src="https://img.icons8.com/ios/100/FD7E14/benzene-ring.png" alt="benzene-ring"/> 
   </div>
    <div className='relative isolate'>
    <div className='relative'>
  <div
    aria-hidden='true'
    className='pointer-events-none absolute inset-x-0 -top-[100px] -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 sm:-left-[300px]'
  >
    <div
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#FFA500] to-[#FFD700] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
    />
  </div>
 
</div>
 <h1  className="mt-2 mx-auto max-w-3xl text-center sm:text-4xl text-3xl md:text-5xl lg:text-6xl">
        Create Content with <span className="text-blue-600">AI</span> in seconds
      </h1>
      <p className="mt-5 max-w-prose text-zinc-800 sm:text-lg">
        AI will help you take care of your Ideas for new Content
      </p>
    </div>
  </MaxWidthWrapper>
  <div className='flex flex-wrap flex-col items-center text-center justify-center'>
    <Search/>
  </div>
</div>

 
  )
}