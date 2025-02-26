import { ChevronRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function EvolutionChain({evolutionChain, typeGradient, speciesData, id}:any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="bg-gradient-to-r w-[90%] md:w-full from-gray-100 to-gray-200 p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 flex items-center">
        <span className="mr-2">Evolution Chain</span>
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${typeGradient}`}></div>
      </h2>
      
      <div className={`flex flex-col sm:flex-row items-center justify-center sm:justify-evenly gap-4`}>
        {evolutionChain.map((evo:any, index:number) => (
          <React.Fragment key={evo.id}>
            <Link href={`/pokemon/${evo.id}`} className="group">
              <div className={`relative ${
                evo.id === id 
                  ? `ring-4 ring-offset-2 ring-opacity-70 ring-gradient-to-r ${typeGradient}` 
                  : ''
              } rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition duration-200`}>
                <Image
                  src={evo.image}
                  alt={evo.name}
                  width={80}
                  height={80}
                  className="drop-shadow-md group-hover:scale-110 transition-transform duration-200 w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <div className="absolute -bottom-1 left-0 right-0 bg-gray-800 bg-opacity-70 text-white text-xs text-center py-1 rounded-b-full capitalize">
                  {evo.name}
                </div>
              </div>
            </Link>
            
            {index < evolutionChain.length - 1 && (
              <div className="flex justify-center my-2 sm:my-0">
                {isMobile ? (
                  <ChevronDown size={24} className="text-gray-500" />
                ) : (
                  <ChevronRight size={24} className="text-gray-500" />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {speciesData?.flavor_text_entries && (
        <div className="mt-4 sm:mt-6 font-semibold bg-gray-100 p-3 sm:p-4 rounded-lg text-gray-700 italic text-sm sm:text-base">
          &apos;&apos; {speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ')} &apos;&apos;
        </div>
      )}
    </div>
  )
}