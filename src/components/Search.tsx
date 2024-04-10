import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import Chatbot from "./chatbot/Chatbot";
import Chatbot2 from "./chatbot/chatbot2";
import config from "@/lib/config";
import { useAuthContext } from "@/context/auth";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  url: z.string().min(4, {
    message: "Channel Link must be at least 6 characters.",
  }),
  id: z.string().default("12345"), // New id field with default value
});

export function Search() {
const {toast} = useToast()
const {userData, userId} = useAuthContext();
console.log(userData);
console.log(userId);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      id: userId 
    },
  });
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  async function onSubmit(data: any) {
    try {
      data.id = `${userId}`;
      setButtonLoading(true);
      const response = await axios.post(`${config.flaskport}/process-url`, data);
      console.log("??????????/")
      console.log(response)
      console.log("??????????/")
      if (response.status === 200) {
        setLoading(true);
        console.log("Channel Link has been processed. User can ask any sort of questions now.");
        toast({
          title:"Process Complete",
          description:`${response?.data?.message}`
        })
      } else {
        console.log("Processing Failed");
        toast({title:"Processing Failed"});
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({title:"Processing Failed",
      description:`${error?.response?.data?.message || error?.message}`
    });

    } finally {
      setButtonLoading(false);
    }
  }

  return (
    <>
    
    <div className="grid w-[95%] bg-amber-100 mx-1 sm:w-[90%] sm:mx-10 items-center rounded-lg border border-amber-100 bg-cream-lighter p-5 gap-1.5">
  <form onSubmit={handleSubmit(onSubmit)} className="block sm:m-5   justify-center"> 
    <p className="text-left my-2">Enter your topic or keyword</p>
    <div className="flex items-center">
      <input 
        id="exampleFormControlInput3"
        type="text" 
        {...register("url")}
        required
        className="border border-cream p-2 w-full rounded-md h-12" // Increased height of input
      />
      <Button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md ml-2 h-12 w-20 sm:w-60" type="submit" disabled={buttonLoading}>
        {buttonLoading ? <Spinner /> : "Process"}
      </Button>
    </div>
  </form>
  <div className="w-full">
      {loading && renderChatbot()} {/* Conditionally render Chatbot based on loading state */}
    </div>
</div>

  

  </>
  
  );
  function renderChatbot() {
    const currentUrl = window.location.href;
    const splitUrl = currentUrl.split('/');
    console.log(currentUrl)
    console.log(splitUrl)
    if (splitUrl[4] === "url-processing") {
      return <Chatbot />;
    } else if (splitUrl[4] === "idea-generator") {
      return (<Chatbot2/>);
    } else {
      return null;
    }
  }
}
