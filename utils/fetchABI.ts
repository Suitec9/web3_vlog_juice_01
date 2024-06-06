/**optioinal */
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@/constant";
import { FormatTypes } from "ethers/lib/utils";

const contractAddress = CONTRACT_ADDRESS;

const quiknode_http = process.env.QUIKNODE_HTTP_URL

async function fetchABI(): Promise<ethers.ContractInterface> {
    try {
        // Create an Ethers.js provider instance
        const provider = new ethers.providers.JsonRpcProvider(quiknode_http);

        // Fetch the contract code
        const code = await provider.getCode(contractAddress);
        console.log("**CODE***:",code)
        // If the contract code is not deployed (0x0), throw an error
        if (code === '0x0') {
            throw new Error('Contract not deployed');
        }

        // Fetch the contract ABI
        const contract = new ethers.Contract(contractAddress, [], provider);
        const abi = contract.interface.format(FormatTypes.json) as ethers.ContractInterface;

        //const abi = JSON.stringify(JSON.parse(typeof abi_01), null, 2);
        console.log("***ABI***ABI***:",abi);

        // Return the ABI
        return abi;
    } catch (error) {
        console.error('Error fetching contract ABI:', error);
        throw error;
    }
}

export default fetchABI;