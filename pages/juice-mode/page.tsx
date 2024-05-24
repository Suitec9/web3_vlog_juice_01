import { useRef, useState } from "react";
//import { create } from "ipfs-core";
import { ethers, utils } from "ethers";
//import fetchABI from "@/utils/fetchABI";
import { CONTRACT_ADDRESS, abi_ } from "@/constant";
import ipfsClient from "@/pages/api/ipfs_00";
import { useRouter } from "next/router";


const VideoUploader = () => {
    const inputFile = useRef<HTMLInputElement>(null);
    const [ file, setFile ] = useState<File | null>(null);
    const [ uploadStatus, setUploadStatus ] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [ cid, setCID ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!file) return;
    };

 //   const handleFile = (e:any) => {
        //setFile(e.target.files?.[0] || null)
   //     uploadToIPFS(e.target.files?.[0])
  //  }

    const uploadToIPFS = async () => {
        if(!file) return;

        setUploadStatus('uploading');

        try {
            //const { cid } = await ipfsClient.add(file);
            const data = new FormData();
            data.append('file', file);
            const res = await fetch("/api/files", {
                method: "POST",
                body: data,
              });
            const resData = await res.json();
            setCID(resData.cid.toString());
            setUploadStatus('success');
        } catch (error){
            console.error('IPFS upload error:', error);
            setUploadStatus('error');
        }
    }

    const handleRegisterCID =  async () => {
        if(!cid) return;
        
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractJuice = new ethers.Contract(CONTRACT_ADDRESS, abi_, signer);
            const tx = await contractJuice.registerCID(cid);
            await tx.wait();
            console.log('CID registered successfully');
        } catch (error){
            console.error('Smart contract error:', error);
        }
    };

    const juiceMeUp = async () => {
        if (!cid) return;

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractJuice = new ethers.Contract(CONTRACT_ADDRESS, abi_, signer);
           // 
            const checkBalance = utils.parseEther("0.0001808")
            const balance = await provider.getBalance(await signer.getAddress());
            if (balance.lt(checkBalance)) {
                throw new Error("Insufficient balance");
            }
            const tx = await contractJuice.juice(cid, {value: checkBalance});
            await tx.wait()
        } catch (err) {
            console.error("failed to transact:", err)
        }
        setLoading(false)

        return (
            <div>{loading}...waiting for transaction to be mined</div>
        )
    }
    
    const handleJuice = async () => {
        await juiceMeUp()
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input type="file"
            className="border border-gray-600 rounded-md px-4 py-2 mb-4"
            onChange={handleFileChange}
            id="video"
            ref={inputFile}
            />
            <button disabled={uploadStatus === 'uploading'}
            onClick={uploadToIPFS}
            className="bg-purple-500 hover:bg-purple-700
            text-white font-bold py-2 px-4 rounded disabled:opacity-55
             disabled:cursor-not-allowed">Upload📼️Video📼️</button>
        </div>
    )
}

export default VideoUploader;