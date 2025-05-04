'use client'

export default function PdfViewer({ fileUrl }) {

  return (
    <div className="w-full flex justify-center items-center">
    <iframe   
    
    src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}      
    className="w-[380px] lg:w-full max-w-[900px] h-[850px]
    bg-[#292626] rounded-lg flex justify-center items-center mx-4 md:mx-10" />
     
  
  </div>
  )
}
