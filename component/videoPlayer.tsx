import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player';

import  "./wrapper.module.css";

interface videoPlayerProps {
    cid: string;
}

const VideoPlayer =  ({cid}: videoPlayerProps) => {
    
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [ isDarkMode, setIsDarkMode ] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [ posterSrc, setPosterSrc ] = useState<string | null>(null)
    const hardcodedCID = "QmP8BmPuiSGB9mcoZRvXUXTsnXS5bLQgpEdXjeCi5i6Re5"

    useEffect(() => {
        // Check if the user's preferred color scheme is dark
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDarkMode);
    
        // Check if the user is on a mobile device
        const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setIsMobile(isMobileDevice);
        // Load the video and poster from IPFS
        const loadedContent = async () => {
            const videoUrl = await fetchIPFScontent('video-cid');
            const posterUrl = await fetchIPFScontent('poster-cid');
            setPosterSrc(posterUrl);
            setVideoSrc(videoUrl)
        };
        loadedContent()
      }, []);

      const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
      }

      const fetchIPFScontent = async (cid: string) => {
        return "https://www.youtube.com/watch?v=mUPKMj-23fs" //`https://ipfs.io/ipfs/${cid}`;
      }

    if (!videoSrc) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen
         bg-gray-900 text-purple-600">
            <div className="flex items-center mb-4">
                <h3 className="text-1xl md:text-3xl font-bold ml-5 flex items-center">
                    <svg className="w-6 h-6 md:w-8 md:h-8 inline-block "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                     <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 18h8a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Juice Player
                </h3>
                <button className={`ml-auto px-4 py-2 rounded-md transition ${isDarkMode ?
                    'bg-gray-800 hover:bg-gray-700 text-purple-600'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                 } ${isMobile ? 'mobile-button' : ''}`} onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <div className={`w-full max-w-4xl  mx-auto px-4`}>
            <div className="playerwrapper relative pb-[56.25] 
            rounded-lg overflow-hidden shadow-lg md:pb-0 md:h-[600px]">
            <ReactPlayer
            controls
             poster={posterSrc}
             width={1000}
             height={890}
             url={videoSrc}
             className="absolute top-0 left-0 w-full h-full"/>
             </div>
             </div>
        </div>
    )
}
export default VideoPlayer;
