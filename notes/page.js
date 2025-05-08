'use client'

import React, { useEffect, useRef, useState,useCallback } from 'react';
import Link  from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import PdfViewer from '../pdfViewer/page';
import ProtectedRoute from '../ProtectedRoute/page';


// const PdfViewer = dynamic(() => import('../pdfViewer/page'), { ssr: false });



function Notes() {

  const [CSRelatedPdf,setCSRelatedPdf] = useState([])

  const [currentPdfLink, setCurrentPdfLink] = useState(''); // State to hold the current PDF link
  

  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])

  const [fadeIn, setFadeIn] = useState(false); // Disable fadeIn for mobile

  var SubjectNumber = ''
  var Sem = ''

  useEffect(()=>{

    setTimeout(()=>{

      SubjectNumber =  sessionStorage.getItem("SubjectNumber")
      Sem = sessionStorage.getItem("Sem")

    },2000)
   
  },[])


  const [dropdown,setdropdown] = useState(false)

  useEffect(() => {

    console.log("Updated in NotesPage:", SubjectNumber, Sem); // ✅ This will now show the updated values
    setTimeout(()=>{

        setdropdown(true)
    },1000)
    setdropdown(false)
  }, [SubjectNumber, Sem]);




  
  
  useEffect(() => {


    const SubjectNumber = sessionStorage.getItem("SubjectNumber")
  const Sem = sessionStorage.getItem("Sem")



    console.log("Fetching data..."+SubjectNumber+" "+Sem);
    setCSRelatedPdf([]);
    setSelectedSubjectNumber([]);
  
    var myData = { SubjectNumber, Sem };
  
    fetch("/api/getNotes", {
      method: "POST",  // Assuming you want to send data, change to "GET" if not
      headers: {
        "Content-Type": "application/json", // Ensure the correct content type
      },
      body: JSON.stringify(myData) // Pass the data you want to send
  })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
      if (data) {  // Ensure that data exists
        console.log("✅ Raw response data:", data);
        
        // Set the state properly
        setCSRelatedPdf(data);  // Assuming data is an array or object
        setSelectedSubjectNumber(data); // If needed, adjust depending on your data structure
        setFadeIn(true);  // Trigger fade-in
      } else {
        console.log("Error fetching data: No data returned");
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error); // Catch and log any network errors
    });
  
    
  },[])



    const [home,setHome] = useState(false);
    const [session,setSession] = useState(false);
    const [courses,setCourses] = useState(false);
    const [notes,setNotes] = useState(true);



    const TurnOnHome = () =>{

        setHome(true);
        setSession(false);
        setCourses(false)
        setNotes(false)
    }

    const TurnOnSession = () =>{

        setHome(false);
        setSession(true);
        setCourses(false)
        setNotes(false)

    }

    const TurnOnCourses = () =>{

      setHome(false);
      setSession(false);
      setCourses(true)
      setNotes(false)

    }

    const TurnOnNotes = () =>{

      setHome(false);
      setSession(false);
      setCourses(false)
      setNotes(true)

    }



  
const handleToggle = (subjectNumber) => {




  setSelectedSubjectNumber((prev) => {
    const existingSubject = prev.find(sub => sub.SubjectNumber === subjectNumber);
    
    if (existingSubject) {
      return prev.map(sub =>
        sub.SubjectNumber === subjectNumber
          ? { ...sub, State: existingSubject.State === 0 ? 1 : 0 } 
          : sub
      );
    } else {
      return [...prev, { SubjectNumber: subjectNumber, State: 1 }];
    }
  });
  

};






useEffect(() => {
  setTimeout(() => {
    setFadeIn(true);
  }, 100); // Small delay to trigger animation after mounting
}, []);

  // Detect screen size and update states dynamically


  const handleDropdown = ()=>{

      setdropdown(!dropdown)
  }


  const handlePdfClick = (pdfLink) => {
    setCurrentPdfLink(pdfLink);
  }


    const [sidebarOpen, setSideBarOpen] = useState(false);
  
      const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
  
    window.addEventListener("resize", handleResize);
  
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    return (


<ProtectedRoute redirectTo = '/'>


      <div className="w-screen h-screen bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#000000]  overflow-auto">
        <motion.div
          initial={{ x: -2008, opacity: 0.9 }}
          animate={fadeIn ? { x: 0, opacity: 1 } : { x: 0, opacity: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#000000]  min-h-screen w-full flex flex-col md:flex-row border-r border-[#645D5D]"
        >

<div
    className={` z-40 top-0 fixed left-0  h-full w-48 bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#000000]  border-r border-gray-700 transform transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
     <div className="p-2 border-b  border-gray-600 mt-3 flex justify-between items-center">
      <h2 className="text-xl  font-bold text-[#50ee37]">📘 Dashboard</h2>
      <button onClick={() => setSideBarOpen(false)} className="text-white">
        <X size={24} />
      </button>
    </div>
    <nav className="p-4 items-center space-y-4">
    

        <div className='flex flex-col gap-5 items-center'>
            <Link href='/'><img src='/LogoSynergy.jpeg'  className='mt-5   bg-black lg:w-[68px] lg:h-[64px] w-[58px] h-[54px] cursor-pointer rounded-full  lg:rounded-full ' /></Link>

                                                    <Link href='/' onClick={TurnOnHome} className={` lg:w-[68px] w-[188px] h-14  hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${home ? 'bg-black border-l-2 border-orange-500':'' } `}>
                                                        <div className='flex flex-row gap-2 justify-center items-center '>
                                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-house-door mt-1 lg:w-7 lg:h-7 w-5 h-5 text-white" viewBox="0 0 16 16">
                                                            <path fillRule='evenodd' d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                                                        </svg>
                                                            <h1 className='text-white text-sm '>Home</h1>
                                                        </div>
                                                    </Link>
                
                                                    <Link href='/sessions'  onClick={TurnOnSession} className={` lg:w-[68px] w-[188px] h-[54px]    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${session ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                                        <div className='flex flex-row gap-2 self-start justify-center items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-camera-video ml-4 mt-1 lg:w-7 lg:h-7 w-5 h-5 text-white" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
                                                        </svg>
                                                            <h1 className='text-white text-sm  '>Sessions</h1>
                                                        </div>
                            
                                                    </Link>
                
                                                    <Link href='/courses' onClick={TurnOnCourses} className={` lg:w-[68px] w-[188px]    h-[54px]    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${courses ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                                        <div className='flex flex-row gap-2 justify-center items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-mortarboard ml-2 lg:w-7 lg:h-7 mt-1 w-5 h-5 text-white" viewBox="0 0 16 16">
                                                            <path fillRule='evenodd' d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                                                            <path fillRule='evenodd' d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                                                        </svg>
                                                            <h1 className='text-white text-sm '>Courses</h1>
                                                        </div>
                
                                                    </Link>
                
                                                
                                                </div>
    </nav>
    </div>






          <div className="flex z-10 min-h-screen w-full flex-col md:flex-row gap-5">


          {!sidebarOpen ?
        <button
        onClick={() => setSideBarOpen(true)}
        className=" lg:hidden md:hidden mt-3 absolute top-4 left-4 z-50 border-[#3cba2e] hover:bg-slate-700 border-2  text-white p-2 rounded-md"
        >
        <Menu size={20} />
        </button>
        : null}



                <div className={`bg-[#0F0C0C]   self-start  fixed  flex-col gap-14 border-r border-[#645D5D] w-[60px]  lg:w-[70px]  h-full ${width < 450 ? 'hidden':''} `}>
                
                                                <Link href='/'><img src='/LogoSynergy.jpeg'  className='mt-16 bg-black lg:w-[68px] lg:h-[64px] w-[58px] h-[54px] cursor-pointer rounded-full  lg:rounded-full ' /></Link>
                
                                                <div className='flex flex-col lg:mt-5 gap-10'>
                                                    <Link href='/' onClick={TurnOnHome} className={` lg:w-[68px] w-[58px] h-14    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${home ? 'bg-black border-l-2 border-orange-500':'' } `}>
                                                        <div className='flex flex-col justify-center items-center '>
                                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-house-door mt-1 lg:w-7 lg:h-7 w-5 h-5 text-white" viewBox="0 0 16 16">
                                                            <path fillRule='evenodd' d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                                                        </svg>
                                                            <h1 className='text-white text-sm '>Home</h1>
                                                        </div>
                                                    </Link>
                
                                                    <Link href='/sessions'  onClick={TurnOnSession} className={` lg:w-[68px] w-[58px] h-[54px]     hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${session ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                                        <div className='flex flex-col self-start justify-center items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-camera-video mt-1 lg:w-7 lg:h-7 w-5 h-5 text-white" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
                                                        </svg>
                                                            <h1 className='text-white text-sm  '>Sessions</h1>
                                                        </div>
                            
                                                    </Link>
                
                                                    <Link href='/courses' onClick={TurnOnCourses} className={` lg:w-[68px] w-[58px]   h-[54px]    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${courses ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
                                                        <div className='flex flex-col justify-center items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-mortarboard lg:w-7 lg:h-7 mt-1 w-5 h-5 text-white" viewBox="0 0 16 16">
                                                            <path fillRule='evenodd' d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                                                            <path fillRule='evenodd' d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                                                        </svg>
                                                            <h1 className='text-white text-sm '>Courses</h1>
                                                        </div>
                
                                                    </Link>
                
                                                
                                                </div>
                </div>


<div className="flex flex-col  gap-10 lg:ml-[270px] px-4">
  <div className="flex flex-col  lg:ml-20 flex-1 mt-[80px] md:mt-[20px] md:ml-[80px]  px-2 overflow-auto">
    {CSRelatedPdf.length > 0 && (
      <div className={`transition-all duration-700 ease-in-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        {CSRelatedPdf.map((pdf) =>
          pdf.Modules.length ? (

            <div key={pdf.SubjectNumber} className="my-4">
              <div className="flex flex-col gap-2 w-full max-w-[800px] bg-[#110d0d] border-2 border-[#1b1918] rounded-lg shadow-lg p-4 mx-auto">
                <div onClick={() => handleToggle(pdf.SubjectNumber)} className="flex cursor-pointer justify-between items-center w-full">
                  <div className={`text-center flex-1 break-words overflow-hidden whitespace-normal ${dropdown ? 'text-[#e65036] font-bold' : 'text-white'}`}>
                    {pdf.SubjectName}
                  </div>
                  <div className="flex flex-col items-center flex-none">
                    {dropdown ? (
                      <svg onClick={handleDropdown} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chevron-up text-[#e65036]  w-[22px] h-[22px]" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                      </svg>
                    ) : (
                      <svg onClick={handleDropdown} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chevron-down text-[#e65036] w-[22px] h-[22px]" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="w-full overflow-x-auto mt-5">
                  <div className={`min-w-[500px] sm:min-w-[680px] transition-all duration-700 ease-in-out bg-gradient-to-br from-[#0f0f0f] via-[#050404] to-[#000000] k ${dropdown ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <table className="table-auto w-full text-white text-xs sm:text-sm md:text-base">
                      <thead>
                        <tr className="border-2 border-[#161313]">
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">SNo.</th>
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">Module Name</th>
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">Notes</th>
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">Mark</th>
                          <th className="px-2 sm:px-4 border-2 border-[#161313] py-2">Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pdf.Modules.map((module, index) => (
                          <tr key={module.ModuleNum} className="border-2 border-[#161313]">
                            <td className="px-2 sm:px-4 py-2 border-2 border-[#161313] text-center">{index + 1}</td>
                            <td className="px-2 sm:px-4 py-2 border-2 border-[#161313] text-center">{module.ModuleName}</td>
                            <td className="px-2 sm:px-4 py-2 border-2 border-[#161313] text-center">
                              <div className="flex flex-wrap justify-center gap-1">
                                {module.PdfLink.map((pdf, index) => (
                                  <svg
                                    key={index}
                                    onClick={() => handlePdfClick(pdf)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="bi bi-journal-bookmark cursor-pointer w-[20px] h-[20px]"
                                    viewBox="0 0 16 16"
                                  >
                                    <path fillRule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8" />
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                                  </svg>
                                ))}
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 py-2 border-2 border-[#161313] text-center">
                              <input type="checkbox" className="w-4 h-4 rounded bg-[#161313]" />
                            </td>
                            <td className="px-2 sm:px-4 py-2 text-center">
                              <i className="bi bi-pencil-fill text-white text-lg sm:text-xl cursor-pointer" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    )}
  </div>


  {currentPdfLink ? (
    <div className="w-full flex justify-center items-center">
       <iframe   
    
    src={`https://docs.google.com/viewer?url=${encodeURIComponent(currentPdfLink)}&embedded=true`}      
    className="w-[380px] lg:w-full max-w-[900px] h-[850px]
    bg-[#292626] rounded-lg flex justify-center items-center mx-4 md:mx-10" />
     
  
       
        {/* <PdfViewer pdfUrl={currentPdfLink}  />  */}
     
    </div>
  ) : null}

  <div className="mb-[200px]" />
</div>


            
          </div>
          <Toaster />
        </motion.div>
      </div>

      </ProtectedRoute>
    );
  };

export default Notes


/*

// <div className='flex flex-col gap-3'>
//               <div className={`flex flex-row gap-5 ml-20 mt-10 self-center  `}>
//                   <button
//                     className=" mb-4 bg-red-500 w-[200px] md:w-[120px] md:text-sm h-[50px] text-white px-4 py-2 rounded"
//                     onClick={() => setPreviewMode(true)}
//                   >
//                     Preview Mode
//                   </button>

//                   <button
//                     className=" mb-4 bg-red-500 w-[200px] md:w-[120px] md:text-sm h-[50px]  text-white px-4 py-2 rounded"
//                     onClick={() => setPreviewMode(false)}
//                   >
//                     Normal Mode
//                   </button>
//             </div>

//            
//             <div
//               className={` z-50 lg:ml-24 self-center w-[1400px]   md:w-3/4 bg-[#1d1919] mt-5  border-[#180a0a] border-custom-dark rounded-md shadow-lg p-4 overflow-auto 
//                 ${isMobile && !showPdfOnMobile ? 'hidden' : 'block'} `}
//             >
//               {/* Back to Notes Button on Mobile *
//               {isMobile && showPdfOnMobile && (
//                 <button 
//                   className="md:hidden mb-4 bg-red-500 text-white px-4 py-2 rounded"
//                   onClick={() => setShowPdfOnMobile(false)}
//                 >
//                   Back to Notes
//                 </button>
//               )}


//               {currentPdfLink ? (
                

//                   <PdfViewer pdfUrl={currentPdfLink} PreviewMode={PreviewMode}/>

//               ) : (
//                 <div className="text-center text-gray-500">Select a PDF to view</div>
//               )}
//             </div>

//             <div className='mt-[100px]'></div>
//           </div>

*/