import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-900 min-h-screen"> {/* Centering inside the viewport */}  
        <div className="flex items-center">  
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 border-solid mx-2" />  
          <span className="text-white text-3xl text-bold">Loading...</span> {/* Loading text */}  
        </div>  
      </div> 
  )
}

export default Loading