import { useEffect, useState } from 'react';

const Slider = () => {
  const [shadeIndex, setShadeIndex] = useState(0); // Initial shade index
  const shadesOfOrange = [
    'bg-orange-100',
    'bg-orange-200',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-orange-600',
    'bg-orange-700',
    'bg-orange-800',
    'bg-orange-900',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment shade index cyclically
      setShadeIndex((prevIndex) => (prevIndex + 1) % shadesOfOrange.length);
    }, 500); // Change color every 500ms

    return () => clearInterval(intervalId); // Cleanup function
  }, []); // Run once on component mount

  return (
    <div className="relative  overflow-hidden h-4 w-full">
      <div className="flex absolute top-0 h-full w-full">
        {shadesOfOrange.map((shade, index) => (
          <div
            key={index}
            className={`flex-1 ${shade} transition-transform duration-500`}
            style={{ transform: `translateX(-${(shadeIndex - index) * 0}%)` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
