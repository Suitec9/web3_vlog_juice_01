"use client"
import { useRef, useState } from "react";

import { ethers, utils } from "ethers";
//import fetchABI from "@/utils/fetchABI";
import { CONTRACT_ADDRESS, abi } from "@/constant";
//import ipfsClient from "@/pages/api/ipfs_00";

//import useIPFSUpload from "../api/helia-remote";
import pinFileToIPFS from "../api/pinFile";



import { handleVideoRegister, juiceFuji } from "@/utils/config/handleVideo";

import LoadingMessage from "@/component/LoadingMessage";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("@/component/videoPlayer"), {
  ssr: false,}) ;


const VideoUploader = () => {
    const inputFile = useRef<HTMLInputElement>(null);
    const [ file, setFile ] = useState<File | null>(null);
    const [ uploadStatus, setUploadStatus ] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [ cid, setCID ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ isRegistering, setIsRegistering ] = useState<boolean>(false)
    const hardcodedCID = 'QmP8BmPuiSGB9mcoZRvXUXTsnXS5bLQgpEdXjeCi5i6Re5';
   

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!file) return;
    };

    const handleSubmit = async () => {
        if(!file){
            setUploadStatus('uploading');
            setIsRegistering(true)
            try {
                const cid = await pinFileToIPFS(file);
                setCID(cid.toString());
                await handleVideoRegister(cid);
            } catch (err) {
                console.error("Error registering CID onChain:", err);
                throw err;
            }
            setIsRegistering(false)
    
        }
    }   

   const handleSubmitVideo = async () => {
     await handleSubmit();
     if (cid) {
        await handleVideoRegister(cid)
     }
   }
   console.log(handleSubmit, "Coast in view");

    const uploadToPINIPFS = async () => {
        if(!file) return;
        try {
            const cid =  await pinFileToIPFS(file);
            setCID(cid.toString());  
           /* const data = new FormData();
            data.append('file', file);
            const res = await fetch("/api/files", {
                method: "POST",
                body: data,
              });
            const resData = await res.json();*/
           // setCID(cid)
            
            setUploadStatus('success');
        } catch (error){
            console.error('IPFS upload error:', error);
            setUploadStatus('error');
        }
        console.log("Alphabeths are spell casting: What you saying?", uploadToPINIPFS)
    }

    const juiceMeUp = async () => {
        if (!cid) return;
       // const abi = await fetchABI()

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractJuice = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
           // 
            const checkBalance = utils.parseEther("0.0001808");
            const balance = await provider.getBalance(await signer.getAddress());
            if (balance.lt(checkBalance)) {
                throw new Error("Insufficient balance");
            }
            const tx = await contractJuice.juice(cid, {value: checkBalance});
            await tx.wait()
        } catch (err) {
            console.error("failed to transact:", err);
        }
        setLoading(false);
        if (loading) {
            return (
            <div>{loading}...waiting for transaction to be mined</div>
        )
        }  

    }
    const handleFuji = async () => {
        if(!cid) return; 
        await juiceFuji(cid)
    }
    
    const handleJuice = async () => {
        await juiceMeUp()
    }
     
    return (
        <div className="flex flex-col items-center 
        justify-center min-h-screen:md:h-screen bg-gray-100 py-8">
            {hardcodedCID && <VideoPlayer cid={hardcodedCID}/>} 
            <input type="file"
            className="w-full:md border border-pink-500 rounded-md px-4 py-2 mb-4"
            onChange={handleFileChange}
            id="mp4"
            ref={inputFile}
            />
            <button onClick={handleSubmitVideo} disabled={uploadStatus === 'uploading' &&
                isRegistering
            }
            
            type="button"
            className=" w-full:md bg-purple-500 hover:bg-purple-700
            text-white font-bold py-2 px-4 rounded disabled:opacity-50
             disabled:cursor-not-allowed">Upload📼️Video📼️</button>
             {isRegistering && <LoadingMessage message="Registering CID with the smart contract..."/>}
             {uploadStatus === 'success' && (
                <div className="flex flex-col items-center">
                <p className="text-gray-800 font-extrabold text-lg mb-4">Juice the Video! 📼️</p>
                <button className="bg-yello-500 hover:bg-yellow-600
                text-purple-700 font-bold py-2 px-4 rounded 
                disabled:opacity-50
                disabled:cursor-not-allowed" onClick={handleJuice}>Juice🤑️</button>
                </div>
             )}       
             <button onClick={handleFuji}
             type="button"
             className="mt-4 w-full:md bg-purple-500 hover:bg-red-700
             text-white font-bold py-2 px-4 rounded "
             >Juice Fuji</button>    
        </div>
    );
};

export default VideoUploader;