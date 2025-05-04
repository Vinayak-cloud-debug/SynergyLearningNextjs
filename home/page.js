'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link  from 'next/link';
import Image from 'next/image';
import ComparisonPage from '../comparison/page';
import {useAuthContext} from '../context/AuthContext';
import Login from '../login/page';
import LogOut from '../LogOut/page';
import { set } from 'mongoose';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const [position, setPosition] = useState(0);
  const [Images, setImages] = useState([
    { src: '/features/12thCourses1.png' },
    { src: '/features/coursespage11.png' },
    { src: '/features/pdfviewer.png' },
    { src: '/features/SampleVideos.png' },
    { src: '/features/Sessions.png' }
  ]);



  const Heading = [

    {text:'Acheive',color:'red'},
    {text:'Learn',color:'blue'},
    {text:'Grow',color:'yellow'},
    {text:'Excel',color:'purple'},
    {text:'Master',color:'orange'},
    {text:'Succeed',color:'green'},
    {text:'Conquer',color:'cyan'},
    {text:'Inspire',  color:'magenta'},
    {text:'Innovate',color:'yellow'},
    {text:'Create',color:'cyan'},
    {text:'Transform',color:'blue'}

  ]


  
  const scrollRef = useRef(null);

  useEffect(() => {
    let position = 0;

    const scroll = () => {
      if (scrollRef.current) {
        position -= 1;

        if (Math.abs(position) >= scrollRef.current.scrollWidth / 2) {
          // Reset position halfway through for infinite loop
          position = 0;
        }

        scrollRef.current.style.transform = `translateX(${position}px)`;
      }
    };

    const interval = setInterval(scroll, 16); // ~60fps
    return () => clearInterval(interval);
    }, [Images]); // Re-run the effect when images change


  const imageListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    animation: 'scrollImages 130s linear infinite',  // 80s for the animation duration, adjust to control speed
  };

  const animationStyle = `
  @keyframes scrollImages {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }
    
  
  `;

  <style jsx>{`
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .scroll-animation {
      animation: scroll 20s linear infinite;
    }
  `}</style>

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/faculty/AbhinavSir.jpg",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
    "/faculty/RahulSir.png",
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex !== 2 ? (prevIndex + 1) % images.length : 0));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex !== 0 ? (prevIndex - 1 + images.length) % images.length : 0));
  };

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const Testimonials = [
    { image: "/testimonials/RuhiShanbag.png", text: "I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers." },
    { image: "/testimonials/RuhiShanbag.png", text: "I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers." },
    { image: "/testimonials/RuhiShanbag.png", text: "I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers." },
    { image: "/testimonials/RuhiShanbag.png", text: "I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers." },
    { image: "/testimonials/RuhiShanbag.png", text: "I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers." },
    { image: "/testimonials/RuhiShanbag.png", text: "I've been studying at Synergy Learning from the past four years, and it has been a great learning experience. The faculties here are experienced, and the study material is well-structured. They emphasize on critical thinking, problem-solving, and creativity prepares us for challenges beyond the classroom and sets us up for success in our careers." },
  ];

  const goToNextTestimonial = () => {
    setCurrentTestimonial((prevIndex) => (prevIndex !== 4 ? (prevIndex + 1) % Testimonials.length : 0));
  };

  const goToPreviousTestimonial = () => {
    setCurrentTestimonial((prevIndex) => (prevIndex !== 0 ? (prevIndex - 1 + Testimonials.length) % Testimonials.length : 0));
  };


  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    const switchSlogan = () => {
      setAnimatingOut(true);
      setTimeout(() => {
        setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % Heading.length);
        setAnimatingOut(false);
      }, 800); // Duration of the slide-out animation
    }
    const interval = setInterval(switchSlogan, 1500); // Change slogan every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentSloganIndex]);

  <style>
  {`
@keyframes slideIn {
0% {
transform: translateY(-10px);
opacity: 0;
}
100% {
transform: translateY(0);
opacity: 1;
}
}

/* Slide out to the bottom */
@keyframes slideOut {
0% {
transform: translateY(0);
opacity: 1;
}
100% {
transform: translateY(10px);
opacity: 0;
}
}

/* Apply animation to the text */
.slide-in-text {
animation: slideIn .2s ease-out forwards;  /* Slide in from above */
}

.slide-out-text {
animation: slideOut 0.2s ease-in forwards; /* Slide out to the bottom */
}
  `}
</style>



    const {authUser,setAuthUser} = useAuthContext();
    const [onClickLogin,setOnClickLogin] = useState(false);

    useEffect(()=>{

        if(authUser)
          setOnClickLogin(false)

    },[authUser])


    const handleLogin = () => {
      setOnClickLogin(!onClickLogin);
    }



  return (
    <div className="bg-[#090707] z-10  w-screen min-h-screen lg:min-h-screen flex flex-col items-center overflow-hidden px-4">



      {onClickLogin && (
        <div className=" z-50 fixed inset-0 flex mt-10 items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="relative">
            {/* Close button */}
            <button
              className="absolute z-60 cursor-pointer top-36 lg:top-24 right-8 text-white text-2xl bg-[#090707] rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition"
              onClick={() => setOnClickLogin(false)}
            >
              ✕
            </button>

            {/* Login component in the center */}
            <Login />
          </div>
        </div>
      )}
    




    <div className="w-full flex flex-row justify-between items-center mt-4">
      <img src='/SynergyNewIcon.png'  className="ml-0 rounded-full lg:ml-2 lg:mt-2 w-16 h-16 lg:w-20 lg:h-20 " />

       {/* Desktop Navigation */}


        <div className='flex flex-row gap-3'>
        {!authUser?

                  
          <div onClick={handleLogin} className='lg:w-[120px] cursor-pointer lg:h-[40px] lg:mt-1 lg:mr-5 w-[80px] h-[45px] flex flex-row gap-1.5 lg:gap-3 items-center justify-center p-2 rounded-lg bg-[#d72c2c]'>
          <h1 className='text-white text-center font-medium text-base lg:text-lg'>Login</h1>
          </div>

          :
            <div className=" flex flex-row gap-6 lg:gap-3 justify-center items-center mr-5">


            
              <Link href="/courses" className="text-white text-lg font-semibold" >
                    <div className='lg:w-[200px] lg:h-[50px] w-[100px] h-[45px] flex flex-row gap-1.5 lg:gap-3 items-center justify-center p-2 rounded-3xl bg-[#d72c2c]'>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-ui-checks-grid w-[20px] h-[20px]" viewBox="0 0 16 16">
                      <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z"/>
                    </svg>
                        <h1 className='text-white text-center font-medium text-xs lg:text-xl'>Dashboard</h1>
                    </div>
              </Link>

              <div className='flex flex-row gap-2'>
                          
                <LogOut   />
              </div>
            </div>

        }
            

        </div>


    </div>


      {/* Slogan */}

      <style>
        {`
 @keyframes slideIn {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Slide out to the bottom */
@keyframes slideOut {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}

/* Apply animation to the text */
.slide-in-text {
  animation: slideIn 0.2s ease-out forwards;  /* Slide in from above */
    display: 'inline-block';
}

.slide-out-text {
  animation: slideOut 0.2s ease-in forwards; /* Slide out to the bottom 
  display: 'inline-block';
}



@keyframes moveRight {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  15% {
    transform: translateX(0);
    opacity: 1;
  }
  85% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.moving-text {
  position: absolute;
  white-space: nowrap;
  animation: moveRight 4s ease-in-out;
}
        `}
      </style>

      {Heading.map((slogan, index) => (
  index === currentSloganIndex ? (
    <div 
      key={index} 
      className='text-center text-white text-lg lg:text-5xl mt-10 lg:w-[1300px] font-mono mb-6 md:mb-10 h-[80px] md:h-[100px]'
    >
      Together We Believe, Together We <span
      className={`${
        animatingOut ? 'slide-out-text' : 'slide-in-text'
      }`}
      style={{ color: slogan.color,display:'inline-block' }}>
        {slogan.text}
      </span>
    </div>
  ) : null
))}


      {/* Mentors Section */}
      <div className='flex flex-col justify-center items-center w-[400px] lg:w-[1200px] h-[550px] bg-[#110b0b] rounded-2xl'>
        <div className='flex flex-row w-[400px] lg:w-[1187px] h-10 justify-between'>
          <button
            onClick={goToPrevious}
            className=" bg-black text-white lg:p-2 ml-2 lg:ml-5 self-start rounded-full w-7 h-7 lg:w-10 lg:h-10 "
          >
            &#60;
          </button>
          <h1 className='text-white font-bold text-base lg:text-2xl text-center'>Meet Our Mentors from IIT'S and NIT'S</h1>
          <button
            onClick={goToNext}
            className=" bg-black text-white mb-3 lg:p-2 lg:mb-0 self-end rounded-full w-7 h-7 lg:w-10 lg:h-10 "
          >
            &#62;
          </button>
        </div>

        {/* Mentor Images */}
        <div className='flex flex-row gap-5 w-[350px] lg:w-[1087px] ml-10 self-start overflow-hidden'>
          <div
            className="flex transition-transform duration-500 mt-5"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <Image
                width={300}
                height={300}
                key={index}

                src={image}
    
                className="w-[300px] mt-10 h-[300px] rounded-2xl mx-5"
                alt={`Faculty ${index}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features */}

      <style>
        {animationStyle}
      </style>
    
      <div className='flex flex-col lg:flex-row  gap-10 lg:gap-44 w-[400px] h-[860px] lg:w-[1200px] mt-28 lg:h-[500px] rounded-2xl bg-[#120c0c] justify-center items-center'>
        <div className='flex flex-col gap-10'>
          <h1 className='text-[#f03232] font-semibold text-2xl  text-left'>Features</h1>
          <div className='flex flex-col gap-4'>
            <span className='text-white font-medium  text-sm text-left'>Curated Lectures and Notes</span>
            <span className='text-white font-medium text-sm text-left'>In-Depth Explanation in the Articles</span>
            <span className='text-white font-medium text-sm text-left'>Session Videos Bi-Weekly</span>
            <span className='text-white font-medium text-sm text-left'>Mentoring Sessions</span>
            <span className='text-white font-medium text-sm text-left'>11th and 12th Dedicated Live Classes</span>
            <span className='text-white font-medium text-sm text-left'>Doubt Support</span>
            <span className='text-white font-medium text-sm text-left'>Discord Community</span>
          </div>
        </div>

        <div className='flex flex-col w-[300px] lg:w-[600px] h-[400px]'>
        <div className='mt-2 overflow-hidden relative justify-center'>
            <div style={imageListStyle} className='scroll-animation' >
              {/* {Images.concat(Images).map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    width={600}  // Make sure the width matches the image size or you can adjust accordingly
                    height={400} // Set appropriate height to match the container size
                    quality={100}  // Optional: set quality to 100 for the best image quality
                    style={{ width: '100%', height: 'auto' }}  // Or use object-fit to avoid distortion
                  />
              ))} */}

        {[...Images, ...Images].map((source, i) => (
                  <Image
                    key={i}
                    src={source.src}
                    width={1200}
                    height={400}
                    alt={`image-${i}`}
                    
                  />
                ))}
            </div>
        </div>



      </div>

    


      </div>

      <div className='flex flex-row mt-32 w-[300px] lg:w-[1400px] justify-between'>
      <button
          onClick={goToPreviousTestimonial}
          className=" bg-black text-white p-2 self-start rounded-full w-10 h-10 "
        >
          &#60;
      </button>
      <h1 className='text-white font-bold text-xl lg:text-2xl text-center '>Student Reviews and Testimonials</h1>

      <button
          onClick={goToNextTestimonial}
          className=" bg-black text-white mb-4 lg:mb-0 p-2 self-end rounded-full w-10 h-10 "
        >
          &#62;
      </button>
    </div>
    <div className='flex flex-row    mt-10 gap-10 w-[400px] lg:w-[1400px]  lg:h-[340px] overflow-hidden'>
      
      {Testimonials.map((testimonial, index) => (

      <div key={index} className='bg-[#12161b] lg:justify-center lg:items-center flex flex-col h-[360px] lg:h-[340px] gap-5 rounded-2xl transition-transform duration-500   ' style={{
        transform: `translateX(-${currentTestimonial * 100}%)`,
      }}>
        <div className='flex flex-row w-[380px] lg:w-[440px]  h-[100px]  gap-16'>

          <Image src={testimonial.image} width={70} height={70} alt={`Image ${index + 1}`} className='w-[70px] h-[70px] mt-5 ml-5 rounded-full' />
          <div className='flex flex-col mt-5 gap-2'>
              <h1 className='text-[#d54521] font-bold text-lg lg:text-2xl'>Ruhi Shanbag</h1>
              <h1 className='text-[#ffffff] font-medium text-base lg:text-lg'>4 Year Course Student</h1>
          </div>
        </div>

        <div className='flex flex-col ml-5  gap-6'>
          
          <p className='text-white text-base font-medium mr-2 justify-center'>
            {testimonial.text}
          </p>
        </div>
      </div>
      ))}

      
    </div>


      <div className='flex flex-col mt-32 gap-5'>
      <h1 className='text-white font-bold text-2xl text-center'>What Makes Us Different from Others ?</h1>
        
      <ComparisonPage/>
    </div>

    <footer className="bg-[#060202] mt-20 w-screen   justify-start items-start transition-all duration-700 ease-in-out animate-fade-in-slide-up h-auto lg:h-[480px] flex flex-col lg:flex-row gap-5 lg:gap-[50px] p-5  overflow-hidden">
      <div className="flex flex-col gap-3 mt-0 w-screen items-center justify-center lg:w-[300px]">
        <img src='/SynergyNewIcon.png' alt="Logo" width={70} height={70} className="self-center rounded-full mt-2 " />
        <div className=" text-sm md:text-md mr-6 lg:mr-0  sm:w-32 font-instrument text-center font-semibold text-[#9A9494] ">
          Best Place to Master Physics Chemistry and Mathematics.
        </div>

        
      </div>


      
          <div className="flex flex-col gap-[15px] w-full lg:w-[300px] ">
            <h1 className="text-[#0B02FF]   text-lg font-semibold md:text-xl mt-[10px] lg:mt-[30px]">Quick Links</h1>
            <div className="flex flex-col gap-[20px]">
              <Link href="/about" className=" text-white text-base font-medium md:text-lg cursor-pointer">Company</Link>
              <Link href="/about" className="text-white text-base font-medium  md:text-lg cursor-pointer">About</Link>
              <Link href="/Contact" className="text-white text-base font-medium  md:text-lg cursor-pointer">Contact</Link>
              <Link href="/PrivacyPolicy" className="text-white font-medium  text-base md:text-lg cursor-pointer">Privacy Policy</Link>
              <Link href="/Tnc" className="text-white text-base md:text-lg cursor-pointer">Terms And Conditions</Link>
              <Link href="/notes" className="text-white text-base md:text-lg cursor-pointer">Notes</Link>
          
            </div>
          </div>

          <div className="flex flex-col gap-[17px] w-full lg:w-[200px]">
            <h1 className="text-[#0B02FF] text-lg font-semibold md:text-xl mt-[10px] lg:mt-[30px]">Navigate To</h1>
            <div className="flex flex-col gap-[18px]">
              <Link href="/CSCluster"  className="text-white font-medium text-base md:text-lg cursor-pointer">Activities</Link>
              <Link href="/ECCluster" className="text-white font-medium text-base md:text-lg cursor-pointer">Mentorship Programs</Link>
              <Link href="/ECCluster" className="text-white font-medium text-base md:text-lg cursor-pointer">Sessions</Link>

            </div>
          </div>

          <div className="flex flex-col gap-[15px] w-full lg:w-[200px] items-start">
            <h1 className="text-[#0B02FF] text-lg font-semibold md:text-xl mt-[10px] lg:mt-[30px]">
              Follow Us On
            </h1>
            <div className="flex flex-row items-center gap-3">
              <Image src= '/instagram-logo-instagram-icon-transparent-free-png 1.svg' alt='instagram' width={50} height={50} className="w-10 h-10 md:w-12 md:h-14 object-contain" />
              <Image src='/linkedin-logo-linkedin-icon-transparent-free-png 1.svg' alt='linkedIn' width={50} height={50} className="w-10 h-10 md:w-12 md:h-14 object-contain" />
              <Image src='/youtube-icon-512x511-vupixj7v-removebg-preview 1.svg' alt='youtube' width={50} height={50} className="w-10 h-10 md:w-12 md:h-14 object-contain" />
            </div>
          </div>


          <div className="flex flex-row items-center gap-2  lg:mt-8">
            <i className="bi bi-c-circle text-white text-base md:text-lg"></i>
            <h1 className="text-white font-medium  text-sm md:text-lg leading-none">
              2025 by <span className="text-[#0B02FF] font-semibold">Synergy Learning</span>
            </h1>
          </div>



        </footer>

    </div>
  );
}
