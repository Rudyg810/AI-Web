import React from 'react';

import { Card } from "./ui/card"; // Import only Card component
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  img: string;
  navigate: string;
}

const ServiceCard: React.FC<CardProps> = ({ title, description, img, navigate }) => { // Add types for props
  return (
    <Link to={navigate} className="md:flex-1 mt-10 mx-auto"> {/* Fixed missing space */}
      <Card style={{ maxWidth: "370px" }} className='min-h-[360px] w-[310px] sm:h-[450px] shadow-lg sm:w-[4\0px] transition-transform hover:scale-105 flex flex-col mx-1 md:mx-10 py-2 sm:px-10 px-3 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
        <img
          className="ml-4 "
          width={50}
          height={50}
          src={img}
          alt="image-preview"
        />
        <div className='px-0 sm:px-3 text-600 md:text-3xl sm:text-lg text-2xl text-left font-medium text-blue-500'>
          {title} 
        </div>
        <div style={{ maxWidth: "100%" }} className='overflow-hidden mt-5 text-left mb-5 px-4 text-zinc-700'>
          {description}
        </div>
      </Card>
    </Link>
  );
}

export default ServiceCard;
