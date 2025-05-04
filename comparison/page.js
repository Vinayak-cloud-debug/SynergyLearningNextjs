// /pages/comparison.js

import React from "react";
import Image from "next/image";


const features = [
  "Live Classes",
  "Dedicated Doubt Support",
  "Motivational Sessions",
  "Sessions on Tackling Exams",
  "Mentorship From Seniors",
  "Dedicated Notes and Articles",
  "Group Discussion Sessions",
  "Mastering Problem Solving techniques",
  "Robotics Event - Apply what you learn",
  "Recorded Video Lectures",
  "Chapter wise Tests",
  "Disciplined Learning Methods",
];

const synergyLearning = [true, true, true, true, true, true, true, true, true, true, true, true];
const others = [true, false, false, false, false, false, false, false, false, true, true, false];

const ComparisonPage = () => {
  return (
    <div className="flex justify-center mt-5 items-center w-full bg-[#090707] py-1 px-5">
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="w-full border-collapse bg-[#0f0c0c] text-white shadow-lg table-fixed">
          <thead>
            <tr className="bg-[#0F0C0C] border-b border-gray-700 text-lg">
              <th className="p-3 pl-4 text-left w-[50%] sm:w-[40%]">Features</th>
              <th className="p-3 text-center w-[25%] sm:w-[30%]">Synergy Learning</th>
              <th className="p-3 text-center w-[25%] sm:w-[30%] pl-3">Others</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-gray-700 bg-[#0F0C0C]">
                <td className="p-3 pl-4 w-[50%] sm:w-[40%]">{feature}</td>
                <td className="p-3 text-center w-[25%] sm:w-[30%]">
                  <Image 
                    src={synergyLearning[index] ? '/correcticon.svg' : '/wrongicon 2.svg'} 
                    width={30} 
                    height={30} 
                    alt="icon" 
                    className="inline-block" 
                  />
                </td>
                <td className="p-3 text-center w-[25%] sm:w-[30%]">
                  <Image 
                    src={others[index] ? '/correcticon.svg' : '/wrongicon 2.svg'} 
                    width={30} 
                    height={30} 
                    alt="icon" 
                    className="inline-block" 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonPage;
