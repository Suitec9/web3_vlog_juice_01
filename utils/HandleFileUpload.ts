/*import uploadToIPFS from "@/pages/api/helia-remote";
import ipfsClient from "../pages/api/ipfs_00";
import pinFileToIPFS from "@/pages/api/pinFile";
import useIPFSUpload from "@/pages/api/helia-remote";

export interface Post {
  title: string;
  content: string;
  images: File[];
}

interface UploadOptions {
  useLocalNode: boolean;
}

const uploadFile = async (post: Post, options: UploadOptions) => {
  const uploadToIPFS  = useIPFSUpload()
  try {
    // Add the post content to IPFS
    
    const contentCID = await uploadToIPFS(post);
    console.log('Added post content:', contentCID);

    // Add the images to IPFS
    const imageCIDs = await Promise.all(post.images.map(async (image) => {
      const  cid  = await ipfsClient.add(image);
      return cid.toString();
    }));
    console.log('Added post images:', imageCIDs);

    // Create a metadata object with the post details
    const metadata = {
      title: post.title,
      content: contentCID.toString(),
      images: imageCIDs,
    };

    if (options.useLocalNode) {
      return metadata;
    }

    // Pin the post metadata to Pinata
    const pinningResponse = await pinFileToIPFS(new File([JSON.stringify(metadata)], 'post.json'));
    console.log("Pinning post:", pinningResponse);

    return metadata;
  } catch (error) {
    console.error('Error uploading post:', error);
    alert('Failed uploading post');
    throw error;
  }
};

const renderPost = (metadata: { title: string; content: string; images: string[] }) => {
  // Render the post using the metadata
  console.log('Post title:', metadata.title);
  console.log('Post content:', metadata.content);
  console.log('Post images:', metadata.images);
};

export { uploadFile, renderPost };*/