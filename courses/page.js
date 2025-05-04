'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Link  from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {useAuthContext} from '../context/AuthContext';
import ProtectedRoute from '../ProtectedRoute/page';



 export default function Courses() {


    
// const router = useRouter()
// const {authUser} = useAuthContext()
// useEffect(()=>{

    
//     if(!authUser){
//         router.push('/')
//     }

// },[authUser,router])

// if (authUser === null) return null;



    const [fadeIn,setFadeIn] = useState(false);
    useEffect(() => {
        setFadeIn(true);
    },[])

   // const dispatch = useDispatch(); // Initialize Redux dispatch

    const [home,setHome] = useState(false);
    const [session,setSession] = useState(false);
    const [Courses,setCourses] = useState(true);



    const TurnOnHome = () =>{

        setHome(true);
        setSession(false);
        setCourses(false)

    }

    const TurnOnSession = () =>{

        setHome(false);
        setSession(true);
        setCourses(false)
    


    }

    const TurnOnCourses = () =>{

        setHome(false);
        setSession(false);
        setCourses(true)
    

    }

    
    const [eleventh,seteleventh] = useState(true);
    const [twelth,settwelth] = useState(false);

    const firstSet = ()=>{
        seteleventh(true);
        settwelth(false);
    }

    const SecondSet = ()=>{
        seteleventh(false);
        settwelth(true);
    }



    // const SubjectNumber = useSelector((state) => state.session.SubjectNumber);
    // const Sem = useSelector((state) => state.session.Sem);


    const router = useRouter()

    const NavigateToNotes = (key, grade) => {
        

        sessionStorage.setItem("SubjectNumber",key);
        sessionStorage.setItem("Sem",grade);
        

        setTimeout(() => {
        
            router.push('/notes');// ✅ Use router.push for navigation
        }, 100);
    };





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

<div className="w-full h-full bg-[#090707] ">

    
    <motion.div
    initial={{ x: -2008, opacity: 0.9 }} // Start slightly off-screen left
    animate={fadeIn ? { x: 0, opacity: 1 } : { x: 0, opacity: 0.9 }} // Animate based on fadeIn state
    transition={{ duration: .5, ease: "easeInOut" }} // Smooth transition
    className="bg-[#090707] w-screen min-h-screen lg:min-h-screen flex flex-col "
  >
     <div
    className={`fixed z-40 top-0  left-0 h-full w-48 bg-[#0a0606] border-r border-gray-700 transform transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
     <div className="p-2 border-b border-gray-600 mt-3 flex justify-between items-center">
      <h2 className="text-xl font-bold text-[#50ee37]">📘 Dashboard</h2>
      <button onClick={() => setSideBarOpen(false)} className="text-white">
        <X size={24} />
      </button>
    </div>
    <nav className="p-4 items-center space-y-4">
    

        <div key={12} className='flex flex-col gap-5 items-center'>
            <Link href='/'>
            <Image src='/LogoSynergy.jpeg' alt='SynergyLogo' width={60} height={60}  className='mt-5   bg-black lg:w-[68px] lg:h-[64px] w-[58px] h-[54px] cursor-pointer rounded-full  lg:rounded-full ' /></Link>

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
                
                                                    <Link href='/courses' onClick={TurnOnCourses} className={` lg:w-[68px] w-[188px]    h-[54px]    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${Courses ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
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

        <div className='flex  flex-row w-full h-full  '>
        {!sidebarOpen ?
        <button
        onClick={() => setSideBarOpen(true)}
        className=" lg:hidden md:hidden mt-3 absolute top-4 left-4 z-50 border-[#3cba2e] hover:bg-slate-700 border-2  text-white p-2 rounded-md"
        >
        <Menu size={20} />
        </button>
        : null}



                <div key={12}  className={`bg-[#0F0C0C]   self-start  fixed  flex-col gap-14 border-r border-[#645D5D] w-[60px]  lg:w-[70px]  h-full ${width < 450 ? 'hidden':''} `}>
                
                                                <Link href='/home'><Image src='/LogoSynergy.jpeg' alt='SynergyLogo' height={60} width={60}  className='mt-16 bg-black lg:w-[68px] lg:h-[64px] w-[58px] h-[54px] cursor-pointer rounded-full  lg:rounded-full ' /></Link>
                
                                                <div className='flex flex-col lg:mt-5 gap-10'>
                                                    <Link href='/home' onClick={TurnOnHome} className={` lg:w-[68px] w-[58px] h-14    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${home ? 'bg-black border-l-2 border-orange-500':'' } `}>
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
                
                                                    <Link href='/courses' onClick={TurnOnCourses} className={` lg:w-[68px] w-[58px]   h-[54px]    hover:bg-gray-700 cursor-pointer hover:bg-opacity-80 flex items-center justify-center ${Courses ? 'bg-black  border-l-2 border-orange-500 ' : ''} `}>
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
            

                <div className='flex flex-col w-screen lg:ml-10  gap-20 border-r border-[#645D5D] '>
                    <div className='flex flex-row gap-5 justify-center items-center'>
                        <h1 className='text-white  font-semibold text-2xl mt-5'>Explore Courses</h1>
                        <Image src='/courses.png' alt='Courses' width={50} height={50} className='mt-5' />
                    </div>

                    <div className=' flex flex-row gap-3  border-b-2 w-auto border-[#302121] '>
                        <h1 className='text-white ml-16 lg:ml-20 text-lg font-medium'>Courses</h1>

                        
                                <div className='flex flex-row gap-2'>

                                    <div onClick={firstSet} className={`w-20 cursor-pointer rounded-md ${eleventh ? 'bg-[#20C030]' : '' } `}>
                                        <h1 className='text-white font-medium text-center' >11th</h1>
                                    </div>

                                    <div onClick={SecondSet} className={`w-20 cursor-pointer rounded-md ${twelth ? 'bg-[#20C030]' : '' } `}>
                                        <h1 className='text-white font-medium text-center' >12th</h1>
                                    </div>
                                </div>

                    </div>



                        <div className='flex flex-row gap-20 ml-10  lg:ml-20  flex-wrap'>
                            {eleventh ?
                    
                            (<div  className='flex flex-row flex-wrap gap-12'>
                                <div onClick={()=>NavigateToNotes(1,11)} className='w-72 h-72 cursor-pointer  gap-5 flex flex-col justify-center items-center  bg-[#1D5455] rounded-lg border border-[#524c4c]'>
                                    <Image src= '/courses/SBSPHY.svg' alt='fundamentalIcon' width={150} height={150} />
                                    <Image src='/courses/FUNDAMENTALS OF PHYSICS.svg' alt='PhysicsFundamentals' width={200} height={200}/>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>Physics</h1>

                                        <div className='flex flex-row gap-2'>
                                            <Image src='/courses/icons8-sheet-50 1.svg' alt='Topics' width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>5 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div onClick={()=>NavigateToNotes(2,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1A5677] rounded-md border border-[#524c4c]'>
                                    <Image src= '/courses/SBSPHY.svg' alt='fundamentalIcon' width={150} height={150} />
                                    <Image src='/courses/FUNDAMENTALS OF CHEMISTRY.svg' alt='ChemistryfundamentalIcon' width={200} height={200}/>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>Chemistry</h1>

                                        <div className='flex flex-row gap-2'>
                                            <Image src='/courses/icons8-sheet-50 1.svg' alt='topics' width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>5 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div  onClick={()=>NavigateToNotes(3,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#04011E] rounded-md border border-[#524c4c]'>
                                    <Image src= '/courses/SBSPHY.svg' alt='fundamentalIcon' width={150} height={150} />
                                    <Image src='/courses/FUNDAMENTALS OF MATHEMATICS.svg' alt='MathematicsfundamentalIcon' width={200} height={200}/>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>Mathematics</h1>

                                        <div className='flex flex-row gap-2'>
                                            <Image src='/courses/icons8-sheet-50 1.svg' alt='topics' width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>5 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div onClick={()=>NavigateToNotes(4,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#102e48] rounded-md border border-[#524c4c]'>
                                    <Image src='/courses/physicsIcon.png' alt='CorePhysics' width={130} height={130} />  
                                    <h1 className='text-white font-medium'>CORE PHYSICS CONCEPTS</h1>


                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>11th PHYSICS</h1>

                                        <div className='flex flex-row gap-2'>
                                            <Image src='/courses/icons8-sheet-50 1.svg' alt='topics' width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>15 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div onClick={()=>NavigateToNotes(5,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1c4234] rounded-md border border-[#524c4c]'>
                                    <Image src='/courses/ChemistryIcon.png' alt='ChemistryCore' width={130} height={130} />  
                                    <h1 className='text-white font-medium'>CORE CHEMISTRY CONCEPTS</h1>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>11th Chemistry</h1>

                                        <div className='flex flex-row gap-2'>
                                            <Image src='/courses/icons8-sheet-50 1.svg' alt='topics' width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>15 Topics</h1>
                                        </div>
                                    </div>

                                </div>


                                <div onClick={()=>NavigateToNotes(6,11)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1d8732] rounded-md border border-[#524c4c]'>
                                    <Image src= '/courses/MathematicsIcon.png' alt='fundamentalIcon' width={130} height={130} />  
                                    <h1 className='text-white font-medium'>CORE MATHEMATICS CONCEPTS</h1>

                                    <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                        <h1 className='text-white mt-2 ml-4 font-medium text-lg'>11th Mathematics</h1>

                                        <div className='flex flex-row gap-2'>
                                            <Image src='/courses/icons8-sheet-50 1.svg' alt='topics' width={20} height={20} className='ml-4' />
                                            <h1 className='text-white font-medium'>15 Topics</h1>
                                        </div>
                                    </div>

                                </div>

                                <div className='mt-10'></div>
                        </div>
                        ):null}
                        

                        {twelth ? 

                        (
                        <div onClick={()=>NavigateToNotes(7,12)} className='flex flex-row flex-wrap  gap-12'>
                            <div className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#102e48] rounded-md border border-[#524c4c]'>
                                <Image src='/courses/physicsIcon.png' alt='CorePhyics' width={130} height={130} />  
                                <h1 className='text-white font-medium'>CORE PHYSICS CONCEPTS</h1>


                                <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                    <h1 className='text-white mt-2 ml-4 font-medium text-lg'>12th PHYSICS</h1>

                                    <div className='flex flex-row gap-2'>
                                        <Image src='/courses/icons8-sheet-50 1.svg' alt='topics' width={20} height={20} className='ml-4' />
                                        <h1 className='text-white font-medium'>15 Topics</h1>
                                    </div>
                                </div>

                            </div>

                            <div onClick={()=>NavigateToNotes(8,12)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1c4234] rounded-md border border-[#524c4c]'>
                                <Image src='/courses/ChemistryIcon.png' alt='CoreChemistry' width={130} height={130} />  
                                <h1 className='text-white font-medium'>CORE CHEMISTRY CONCEPTS</h1>

                                <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                    <h1 className='text-white mt-2 ml-4 font-medium text-lg'>12th Chemistry</h1>

                                    <div className='flex flex-row gap-2'>
                                        <Image src='/courses/icons8-sheet-50 1.svg' alt='topics' width={20} height={20} className='ml-4' />
                                        <h1 className='text-white font-medium'>15 Topics</h1>
                                    </div>
                                </div>

                            </div>


                            <div onClick={()=>NavigateToNotes(9,12)} className='w-72 h-72 cursor-pointer mt-0 gap-5 flex flex-col justify-center items-center  bg-[#1d8732] rounded-md border border-[#524c4c]'>
                                <Image src= '/courses/MathematicsIcon.png' alt='MathematicsCore' width={130} height={130} />  
                                <h1 className='text-white font-medium'>CORE MATHEMATICS CONCEPTS</h1>

                                <div className='w-[287px] h-24 mt-2 flex flex-col gap-2 bg-[#191515] rounded-b-md'>
                                    <h1 className='text-white mt-2 ml-4 font-medium text-lg'>12th Mathematics</h1>

                                    <div className='flex flex-row gap-2'>
                                        <Image src='/courses/icons8-sheet-50 1.svg' alt='TOpics' width={20} height={20} className='ml-4' />
                                        <h1 className='text-white font-medium'>15 Topics</h1>
                                    </div>
                                </div>

                                

                            </div>

                            <div className='mt-10'></div>
                            </div>
                        ):null}


                    </div>
                    
                </div>

                <div className='mt-10 h-20'>

                </div>

                

                
        </div>

        <div className='mt-10 h-20'></div>

    </motion.div>
   
</div>
</ProtectedRoute>
  )
};