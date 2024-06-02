import {  ethers} from "ethers";
import { testnetConfig } from "./networkConfig";
import { CONTRACT_ADDRESS, abi } from "@/constant";
import fetchABI from "../fetchABI";
//import { PostState } from "@/pages/create-post";


//const abi_ =  await fetchABI();

const createPostOnChain = async (title: string, hash: string) => {
    try {
        if(!window.ethereum) return;
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();

        const contractSlim = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        const tx = await contractSlim.createPost(title, hash);
        await tx.wait();
    } catch (err) {
        console.error('Error creating post onChain:', err);
        throw err;
    }
}
export default createPostOnChain;