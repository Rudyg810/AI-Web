import ServiceCard from '@/components/Card'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function Services() {

return(
    <>
<div className='my-auto mt-10 sm:mx-[300px] flex flex-wrap gap-4'>
    <ServiceCard navigate={"url-processing"} img={"/download.svg"} title={"OpenAI: The Ultimate AI-Powered Title and Description Generator"} description={"Welcome to AI powered, the future of content creation! Powered by OpenAI, Revolutionize the way you generate titles and descriptions. Say Bye to writer's block and hello to endless possibilities with intuitive interface and accuracy. Join the AI revolution today and unlock limitless creativity at your fingertips!"} />

    <ServiceCard navigate={"idea-generator"} img={"/download.svg"} title={"OpenAI: The Ultimate AI-Powered Idea generator"} description={"Welcome to AI powered, the future of content creation! Powered by OpenAI, Revolutionize the way you generate Social Media Ideas. Say Bye to writer's block and hello to endless possibilities with intuitive interface and accuracy. Join the AI revolution today and unlock limitless creativity at your fingertips!"} />

    <ServiceCard navigate={"thumbnail-processing"} img={"/download1.svg"} title={"Vidgrounds: Thumnail Generation"} description={"Welcome to Thumbnail Delivery Guaranteed Thumbnail delivery within 24 hours."} />
</div>


    <MaxWidthWrapper className="mb-12 mt-2 sm:mt-20 flex flex-wrap flex-col items-center text-center justify-center">


    <div>
      <div className='relative isolate'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
          />
        </div>
      </div>
    </div>
    </MaxWidthWrapper>

    </>
  )
}