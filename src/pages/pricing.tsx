import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js";
import { useAuthContext } from '@/context/auth'
import config from '@/lib/config'
import { checkout } from '@/components/checkout'
const stripePromise = loadStripe(config.StripePublishableKey);

const Pricing = () => {

const [scheme, setScheme] = useState("level_3")
const { userData } = useAuthContext();
console.log(userData)

async function getScheme() {
  try {
      const res = await axios.get(`${config.port}/api/v1/auth/scheme/${userData?.data?.userId}`);
      // Handle the response here
      console.log(res.data); // For example, logging the response data
      setScheme(res?.data?.scheme)
  } catch (error) {
      // Handle errors here
      console.error("Error fetching scheme:", error);
      throw error; // Rethrow the error or handle it as per your requirement
  }
}

useEffect( ()=>{
getScheme();
},[])

    const pricingItems = [
    {
      plan: 'Starter',
      tagline: 'For Beginners',
      quota: 19.99,
      features: [
        {
          text: '15 Ttile & Description & 2 revision',
          footnote:
            'The maximum amount of title & descriptions you can generate along with revisions',
        },
        {
          text: '0 Thumbnails',
          footnote:
            'Can buy for extra $',
            negative: true,
        },
        {
          text: '10 Post it Everywhere',
          footnote:"Share your creation on Social Media"
        },
        {
          text: '10 YouTube Ideas generator',
          footnote:
            'Generate Ideas specifically according to your Channel',
        },
        {
          text: 'Youtube Rediection',
        },
        {
          text:"",
          negative:true
        },
        {
          text:"",
          negative:true

        },
      ],
    },
    {
      plan: 'Budget',
      tagline: 'For Budget friendly Customers.',
      quota: 49.99,
      features: [
        {
          text: '25 Ttile & Description & 2 revision',
          footnote:
            'The maximum amount of title & descriptions you can generate along with revisions',
        },
        {
          text: '2 High Quality Thumbnails',
          footnote:
            'Can buy for extra $',
        },
        {
          text: '20 Post it Everywhere',
          footnote:"Share your creation on Social Media"
        },
        {
          text: '20 YouTube Ideas generator',
          footnote:
            'Generate Ideas specifically according to your Channel',
        },
        
        {
          text: 'Youtube Rediection',
        },
        {
          text:"",
          negative:true
        },
        {
          text:"",
          negative:true

        },
      ],
    },
    {
        plan: 'Essential',
        tagline: 'For Premium Customers',
        quota: 79.99,
        features: [
          {
            text: '30 Ttile & Description',
            footnote:
              'The maximum amount of title & descriptions you can generate along with revisions',
          },
          {
            text: '4 High Quality Thumbnails',
            footnote:
              'Can buy for extra $',
          },
          {
            text: '30 Post it Everywhere',
            footnote:"Share your creation on Social Media"
          },
          {
            text: '30 YouTube Ideas generator',
            footnote:
              'Generate Ideas specifically according to your Channel',
          },
          {
            text:"15 Competitor Checker",
            footnote:"Check what your Competitors are doing"
          },
          {
            text:"10 Youtube Video Script Writer",
            footnote:"Sit Back and let the AI do the scripting"
          },
          {
            text: 'Youtube Rediection',
          },
        ],
      }
  ]
  const payment = (plan) =>{
    if(plan === "Starter"){
      checkout({
        lineItems: [{ price: "price_1OyfP0SF8iNIRdD3MqRYE3r3", quantity: 1 }]
      });
    }
    if(plan === "Budget"){
      checkout({
        lineItems: [{ price: "price_1OyfP0SF8iNIRdD3MqRYE3r3", quantity: 1 }]
      });
    }
    if(plan === "Essential"){
      checkout({
        lineItems: [{ price: "price_1OyfP0SF8iNIRdD3MqRYE3r3", quantity: 1 }]
      });    }
  }
  

  return (
    <>

      <div  className="">
      <h1  className="mx-auto mt-5  max-w-xl text-center sm:text-4xl text-3xl md:text-4xl lg:text-5xl">
        Create Content with <span className="text-blue-600">AI</span> in seconds
      </h1>
      <p  className="mx-auto mt-5 min-w-prose text-zinc-800 text-center sm:text-lg">
        AI will help you take care of your Ideas for new Content
      </p>
{/* {
  scheme ? (<p>
    This is your current scheme going on {scheme}
  </p>):
  (<p>
    There is no current ongoing scheme
  </p>)
} */}
      </div>
        <div className='px-5 justify-center  items-center mt-5 pt-12 grid grid-cols-1 gap-20 lg:grid-cols-3'>
          <TooltipProvider>
            {pricingItems.map(
              ({ plan, tagline, quota, features }) => {
                return (<div
                  key={plan}
                  className={cn(
                    'relative rounded-2xl bg-white w-full sm:max-w-[400px] mx-auto shadow-lg',
                    {
                      'border-2 border-blue-600 shadow-blue-200': plan === 'Essential',
                      'border-2 border-black shadow-blue-200': plan !== 'Essential',
                    }
                  )}
                >
                  <div className="p-5">
                    <h3 className="my-3 text-center font-display sm:text-3xl text-2xl font-bold">
                      {plan}
                    </h3>
                    <p className="text-gray-500">{tagline}</p>
                    <p className="my-5 font-display sm:text-5xl text-4xl font-semibold">
                      ${quota}
                    </p>
                  </div>
                
                  <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-1">
                      <p>{quota.toLocaleString()} $ per month</p>
                    </div>
                  </div>
                
                  <ul className="my-10 space-y-5 px-8">
                    {features.map(({ text, footnote, negative }) => (
                      <li key={text} className="flex space-x-5">
                        <div className="flex-shrink-0">
                          {negative ? (
                            <Minus className="h-6 w-6 text-gray-300" />
                          ) : (
                            <Check className="h-6 w-6 text-blue-500" />
                          )}
                        </div>
                        {footnote ? (
                          <div className="flex items-center space-x-1 flex-auto">
                            <p
                              className={cn('text-gray-600', {
                                'text-gray-400': negative,
                              })}
                            >
                              {text}
                            </p>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className="cursor-default ml-1.5">
                                <HelpCircle className="h-4 w-4 text-zinc-500" />
                              </TooltipTrigger>
                              <TooltipContent className="w-80 p-2">{footnote}</TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p
                            className={cn('text-gray-600', {
                              'text-gray-400': negative,
                            })}
                          >
                            {text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200" />
                  <div className="p-5">
                  <button 
                  onClick={() => payment(plan)}
                  className="bg-gradient-to-r sm:h-12 j-7 from-blue-600 to-blue-800 rounded-full flex items-center justify-center w-full py-3 px-6 text-white font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300">
                      <span>
                      Upgrade Now</span>
                      <ArrowRight className='h-5 w-5 ml-1.5' />
                  </button>
                  </div>
                </div>
                
                )
              }
            )}
          </TooltipProvider>
        </div>
    </>
  )
}

export default Pricing
