//import { CONTRACT_ADDRESS, abi } from "@/constant";
import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_JUICE, ChainLinkABI, acceptAbi_} from "@/constant/abi"
import { ethers, utils } from "ethers";
// import fetchABI from "../fetchABI";
const gasLimit = 500000;

export const handleVideoRegister = async (cid: string) => {
   // const abi_ = await fetchABI()
    if (!window.ethereum) return;

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        const contractSlim = new ethers.Contract(CONTRACT_ADDRESS_JUICE, acceptAbi_, signer);
     //   const cidBytes32 = ethers.utils.formatBytes32String(cid);
    
        const tx =  await contractSlim.registerCID(cid, {gasLimit});
        tx.wait()
        console.log('Transaction sent:', tx.hash); 
                    
    } catch (err){
        console.error("Error registering the cid:",err);
        throw err;
    }
}

export const juiceMeVideo = async (cid: string) => {
    if (!window.ethereum) return;
     try { 
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractSlim = new ethers.Contract(CONTRACT_ADDRESS_JUICE, acceptAbi_, signer);

        const checkBalance = ethers.utils.parseEther("0.0001808");
        const balance = await provider.getBalance(await signer.getAddress());
        if (balance.lt(checkBalance)) {
            console.error('load eth into wallet');
            throw new Error('insufficient fund');
        }
        //const cidBytes32 = ethers.utils.formatBytes32String(cid)
        const tx = await contractSlim.juice(cid, {value: checkBalance});
        tx.wait();
     } catch (err) {
        console.error('Error juicing video: Thanks for support', err);
        throw err;
     }
}

export const juiceFuji = async (cid: string) => {
    if (!window.ethereum) return;
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractCrossChain = new ethers.Contract(CONTRACT_ADDRESS, ChainLinkABI, signer);
        const checkBalance = ethers.utils.parseEther("0.0001808");
        const balance = await provider.getBalance(await signer.getAddress());
        if(balance.lt(checkBalance)) {
            console.error('load eth into wallet');
            throw new Error('insufficient funds');
        }

        const cidBytes32 = ethers.utils.formatBytes32String(cid);
    //    const tx = await contractCrossChain.juiceOnFuji(cidBytes32,{value: checkBalance});
   //     tx.wait();
    } catch (err) {
        console.error('Error juicing the video:', err);
        throw err;
    }
}