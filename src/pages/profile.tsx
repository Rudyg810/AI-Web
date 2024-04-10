import { DollarSign, Users, CreditCard, Activity, CloudFog, ArrowUpFromLine } from "lucide-react";
import Card, { CardProps } from "@/components/DashBoardCards";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardsStats } from "@/components/CardStats";


const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users
  },
  {
    label: "Sales",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard
  },

];


export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [discription, setdiscription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Normal method to create data");
    const data = {
      title,
      discription,
      video: selectedFile as Blob
    };

    try {
      setLoading(true);
      console.log(data);
      const response = await axios.post("YOUR_API_ENDPOINT", data);
      if (response) {
        console.log("Form data submitted successfully");
        setTitle("");
        setdiscription("");
        setSelectedFile(null);
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (e) => {
      const file = (e?.target instanceof HTMLInputElement && e.target.files?.[0]) as File;
      handleFile(file);
    };
    input.click();
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const dropFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file: File) => {
    console.log('Selected file:', file);
    setSelectedFile(file);
  };

  return (
    <>
    <div className="flex flex-col gap-5 mt-10 w-full">

      <div className="flex flex-col sm:flex-row justify-between">

          <div className="block w-full justify-center ">
            <div className="flex-grow p-5 sm:min-w-[60%] w-full   border  overflow-hidden">
              <section className="grid  w-fullmx-5 min-w-full grid-cols-1 gap-4 gap-x-4 transition-all sm:grid-cols-2 xl:grid-cols-4">
                {cardData.map((d, i) => (
                  <Card
                    key={i}
                    amount={d.amount}
                    discription={d.discription} // Fix typo in 'discription' prop
                    icon={d.icon}
                    label={d.label}
                  />
                ))}
              </section>
            </div>
            <CardsStats/>
          </div>
                
      
      <div className="flex-grow border p-6 gap-x-2 w-full sm:w-[40%]   overflow-hidden">
        <div >
          <div className="transition-transform hover:scale-105" onClick={selectFile} onDrop={dropFile} onDragOver={allowDrop} style={{ background: "linear-gradient(135deg, #ffffff, #f0f0f0)" }}>
            <div className="flex w-full flex-col gap-3 rounded-xl border p-5 shadow">
              <div style={{ margin: "auto" }} className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudFog className="h-6 w-6 text-black mb-2" />
                <p className="mb-2 text-sm text-black">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-black">{selectedFile?.name} Uploaded</p>
              </div>
            </div>
          </div>
  
          <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <Input type="text" className="my-2 border  " placeholder="Enter title..." required value={title} onChange={(e) => setTitle(e.target.value)}  ></Input>
                    <Textarea required placeholder="Enter your post..." value={discription} onChange={(e) => setdiscription(e.target.value)} className="border  min-h-[200px] my-2 resize-y" ></Textarea>
                    <Button type="submit" title="Submit" className="w-full"  disabled={loading}>
                      {loading ? <Spinner /> : <ArrowUpFromLine />}
                    </Button>
                </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </>
    );
}


