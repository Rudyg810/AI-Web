import React, { useEffect, useState } from "react";
import axios from "axios";
import "./chatbot.css";
import { Send } from "lucide-react";
import { Button } from "../ui/button"; // Import only Button component
import Spinner from "../Spinner";
import config from "@/lib/config";
import { useAuthContext } from "@/context/auth";


const Chatbot = () => {
  const [limit, setLimit] = useState({});
  const { userId } = useAuthContext();
  const  [revision,setRevision] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [asked, setAsked] = useState<boolean>(false);
  const [type,setType] = useState('ask')
  
  useEffect(() => {


    const fetchLimit = async () => {
        try {
            const response = await axios.get(`${config.port}/api/v1/limit/${userId}`);
            await setLimit(response.data);
            console.log("?????????????????")
            console.log(response.data); // Use response.data directly, not 'limit'
            console.log("?????????????????")
            await setRevision(response?.data?.channel?.revision)
        } catch (error) {
            console.error("Error fetching limit data:", error);
            // Handle errors as needed
        }
    };

    fetchLimit();

    // Add userId as a dependency to rerun the effect when it changes
}, [userId]);


  const [chatMessages, setChatMessages] = useState<Array<{ message: string; type: string }>>([
    { message: "Hi there 👋 How can I help you today?", type: "incoming" }
  ]);
  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const askarray = [
    {
      "text": "create new Title & generator",
      "type": "ask"
    }
  ];
  const revisionarray = [
    {
      "text": "Make it a little more Blunt",
      "type": "revision"
    },
    {
      "text": "Present it in formal tone ",
      "type": "revision"
    },
    {
      "text": "Make it sound more entertaining",
      "type": "revision"
    }
  ];

  const handleSendChat = async () => {
    setLoading(true);
    
    if (!userInput.trim()) return;
  
    setChatMessages([
      ...chatMessages,
      { message: userInput.trim(), type: "outgoing" }
    ]);
    setUserInput("");
  
    try {
      if (limit?.channel?.ask === 0 || revision === 0) {
        console.log("Cannot proceed: Both ask and revision limits are 0");
        setLoading(false);
        return;
    }
      const response = await axios.post<{ response: string }>(`${config.flaskport}/ask`, {
        question: userInput.trim(),
        id: userId
      });
  
      if (response?.data?.response) {
        if (type === "ask") {

          await axios.post(`${config.port}/api/v1/limit/reduce/${userId}`, {
            "limitTypes": ["ask"]
          });
          setAsked(true);
        } else if (type === "revision") {
          
          setRevision(prevRevision => prevRevision - 1);
          setAsked(true);
        } else {

          console.error("Unsupported type:", type);
        }
      } else {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { message: "An error occurred while fetching data.", type: "incoming" }
        ]);
      }
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message: response.data.response, type: "incoming" }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message: "An error occurred while fetching data.", type: "incoming" }
      ]);
    } finally {
      setAsked(true);
      setLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendChat();
    }
  };

  const replaceInputText = (item:any) => {
    setUserInput(item?.text);
    setType(item?.type);
  };

  return (
    <div className="mt-1 h-auto pt-5  w-[100%]  ">

      <div style={{ display: "block" }}>
        <div>
          <ul className="chatbox ps-1 " style={{ height: "510px" }}>
            {chatMessages.map((chat, index) => (
              <li key={index} className={`chat ${chat.type} rounded-lg text-xs sm:text-md my-2 p-2 `}>
                {chat.type === "incoming" && (
                  <span className="material-symbols-outlined border border-blue-800"></span>
                )}
                <p>{chat.message}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-end flex-col ">
          {
  !asked ? (
    <div className="flex justify-end flex-col w-auto">
      {askarray.map((item, index) => (
        <div className="flex absolute right-2 sm:right-[100px] flex-row ">
<img className="w-8 my-auto  h-8 " src="https://img.icons8.com/fluency-systems-regular/48/255FEB/ask-question--v1.png" alt="ask-question--v1"/>        <Button
          key={index}
          className="text-blue-600  text-xs hover:bg-white  bg-white border py-0 px-1 border-blue-600 mx-1 rounded-lg w-fit"
          onClick={() => replaceInputText(item)}
          type="button"
        >
          {item.text}
        </Button>
        </div>
        
      ))}
    </div>
  ) : (
    <div className="flex absolute right-2 sm:right-[100px] sm:w-[30%] justify-end flex-row flex-wrap w-[70%]">
      {revisionarray.map((item, index) => (
        <div className="flex  flex-row ">
               <Button
                  key={index}
                  className="text-blue-600 mb-2 text-xs hover:bg-white  bg-white border py-0 px-1  border-blue-600 mx-1 rounded-lg w-auto"
                  onClick={() => replaceInputText(item)}
                  type="button"
                >
                  {item.text}
        </Button>
        </div>
      ))}
    </div>
  )
}

</div>
<div className="chat-input py-2 shadow-lg border" style={{ display: "flex", justifyContent: "space-between" }}>
  <input
    placeholder="Enter a message..."
    spellCheck={false}
    required
    value={userInput}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
    className="w-full text-xs border border-gray-300 ml-2 rounded-sm p-2 shadow-md"
    disabled
  />
  <Button
    className="h-10 w-15 sm:h-10 sm:w-15 text-black text-md"
    style={{ backgroundColor: "white" }}
    onClick={handleSendChat}
    type="submit"
  >
    {loading ? <Spinner /> : <Send />}
  </Button>
</div>

        </div>
      </div>
    </div>
  );
};

export default Chatbot;
