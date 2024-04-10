"use client";
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {LucideArrowDownNarrowWide, MinusCircle, ArrowRight, CloudFog } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Spinner from '@/components/Spinner';
import { useAuthContext } from '@/context/auth';
import config from '@/lib/config';
import { FileInputCardContent } from '@/components/FileInputCard';
import { useToast } from '@/components/ui/use-toast';

interface FileObject extends Blob {
  name: string;
}


function Thumbnail() {
  const {toast} = useToast();
  const [files, setFiles] = useState<number>(0);
  const userData = useAuthContext()
  const [files_real, setFiles_real] = useState<FileObject[]>([]);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [limit,setLimit] = useState({})

  const handelremove = async(item: FileObject) => {
    const updatedFiles = files_real.filter(obj => obj !== item);
    await setFiles_real(updatedFiles);
    console.log(files_real)
  }
  useEffect(() => {


    const fetchLimit = async () => {
        try {
            const response = await axios.get(`${config.port}/api/v1/limit/${userData?.userId}`);
            await setLimit(response.data);
            console.log("?????????????????")
            console.log(response.data); // Use response.data directly, not 'limit'
            console.log("?????????????????")
        } catch (error) {
            console.error("Error fetching limit data:", error);
            // Handle errors as needed
        }
    };

    fetchLimit();

}, [userData?.userId]);
  const selectFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.multiple = true; // Allow multiple files to be selected
    input.onchange = (e) => {
      const fileList = (e as any)?.target?.files; // Explicitly cast e to any type
      if (fileList) {
        const updatedFilesReal = [...files_real];
        for (let i = 0; i < fileList.length; i++) {
          updatedFilesReal.push(fileList[i]);
        }
        setFiles_real(updatedFilesReal);
      }
    };
    input.click();
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const dropFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files;
  };
  const handelview = async(item: FileObject) => {
    window.open(URL.createObjectURL(item), '_blank');
  }
  const handelsend = async (event:any) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    const data = {} // Use FormData to handle file uploads
    data.description = description;
    data.userId = userData?.userId
    data.images =[]
    // Append each image file to FormData
    files_real.forEach((file, index) => {
        data.images[index] = file;
    });

    try {
      console.log(data)
        if (limit?.thumbnail === 0) {
            console.log("Cannot proceed: Thumbnail limit is  0");
            setLoading(false);
            return;
        }
        const response = await axios.post(`${config.port}/api/v1/thumbnail`, data);
        console.log(response)
        if (response?.status === 200) {
            console.log(response);
            toast({
              title:"Requested Thumbnail will be delivered within 24 working Hours"
            })
            await axios.post(`${config.port}/api/v1/limit/reduce/${userData?.userId}`, {
                "limitTypes": ["thumbnail"]
            });
        } else {
            console.log(response, data);
            toast({
              title:"Processing Failed"
            })            
        }
    } catch (error) {
        console.log(error);
        toast({
          title:"Error Processing",
          description:`${error?.response?.data?.message || error?.message}`
        })
    } finally {
        setLoading(false);
    }
};

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const updatedFilesReal = [...files_real];
    acceptedFiles.forEach(element => {
      console.log(element);
      updatedFilesReal.push(element);
    });
    setFiles_real(updatedFilesReal);
  }, [files_real]);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value); // Update description state
  };

  return (
    <>
         <MaxWidthWrapper className="mb-5 mt-2 sm:mt-5 flex flex-wrap flex-col items-center text-center justify-center">
        <div>
          <h1 className="mx-auto  max-w-2xl text-center sm:text-3xl text-3xl md:text-4xl lg:text-5xl">
            Allow us to create<span className="text-blue-600"> Thumbnails</span> for you
          </h1>
          <p className="mx-auto mt-5 max-w-prose text-zinc-800 text-center sm:text-lg">
            Guaranteed 27x Support
          </p>
          
        </div>
      </MaxWidthWrapper>
      
      <div className=' mb-3 items-end justify-end text-right sm:mr-20 mr-4 flex flex-col'> 
          <p> View Our Work</p>
          <LucideArrowDownNarrowWide/></div>

          <form onSubmit={handelsend}>
        <div className=" flex flex-col sm:flex-row w-full ml-0 px-auto j">
          
          <div className="  w-full block">
            <div className="w-full rounded-lg flex flex-col h-full">
              <textarea 
                value={description}
                required
                placeholder='Enter Your Description'
                onChange={handleDescriptionChange}
                className="text-sm sm:text-md border border-blue-200 sm:mt-0 w-[90%] mx-auto rounded-lg mt-5 shadow-lg h-full  min-h-[500px] p-5 resize-none flex-grow"></textarea>
            </div>
          </div>

          <div className=" sm:w-[40%] sm:ml-5 w-[90%] border border-blue-200  rounded-lg mx-auto sm:mt-0 mt-5 shadow-lg h-full min-h-[500px] text-lg sm:text-xl resize-none">
            <div
              className="transition-transform hover:scale-105 w-[93%] mx-auto mt-2"
              onClick={selectFile}
              onDrop={dropFile}
              onDragOver={allowDrop}
              style={{ background: "linear-gradient(135deg, #ffffff, #f0f0f0)" }} // Add gradient background
            >
              <FileInputCardContent>
            <div style={{ margin: "auto" }} className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudFog className="h-6 w-6 text-black mb-2" />
              <p className="mb-2 text-sm text-black">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-black"> Uploaded</p>
            </div>
            </FileInputCardContent>
            </div>
            
            <div className="mt-5 block">
              {files_real.map((item: FileObject, index: number) => (
                <div key={index}>
                  <div className="w-[82%] mx-auto  relative shadow-lg rounded border bg-white overflow-hidden m-2 p-4 text-md transition-transform duration-300 hover:scale-105">
                    <span className="absolute inset-0"></span>
                    <p className="text-left text-md ">{item?.name.substring(0,10)}...</p>
                    <div className="absolute top-1 right-1 flex space-x-2 items-center">
                      <div onClick={() => handelremove(item)}>
                        <MinusCircle className="cursor-pointer mt-3" size={20} />
                      </div>
                      <div onClick={() => handelview(item)}>
                        <ArrowRight className="cursor-pointer mt-3" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

                <button 
                  className="bg-gradient-to-r sm:h-12 my-5 j-7 from-blue-600 to-blue-800 rounded-full flex items-center justify-center w-[80%] mx-auto mt-auto py-3 px-6 text-white font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300">
                  {loading ? <Spinner /> : "Upload"}
                </button>

          </div>
        </div>

      </form>
    </>
  );
}

export default Thumbnail;
