import ipfsClient from "../pages/api/ipfs_00";
import pinFileToIPFS from "@/pages/api/pinFile";


interface UploadOptions {
    useLocalNode: boolean;
}


const uploadFile = async (file: File, options: UploadOptions) => {

    try {
        const  cid  = await ipfsClient.add(file);
        console.log('Added file:', cid);

        if (options.useLocalNode) {
            return cid;
        }

        await pinFileToIPFS(cid.toString());
        console.log("Pinning file:", cid);

        return cid;
    } catch (error) {
        console.error('Error uploading file:', error)
        alert('Failed uploading file');
        throw error;
    }
};

const renderFile = (cid: string) => {

    const gatewayURL = `https://ipfs.io/ipfs/${cid}`;

    console.log('File URL:', gatewayURL);
};

export { uploadFile, renderFile };