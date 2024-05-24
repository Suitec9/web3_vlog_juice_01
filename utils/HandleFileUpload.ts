import { NextResponse } from 'next/server';

export interface Post {
  title: string;
  content: string;
  images: File[];
}

interface UploadOptions {
  useLocalNode: boolean;
}

const uploapPost = async (post: Post, options: UploadOptions) => {
  try {
    // Add the post content to IPFS using Pinata
    const formData = new FormData();
    formData.append('file', new Blob([JSON.stringify(post)], { type: 'application/json' }));
    formData.append('pinataMetadata', JSON.stringify({ name: 'Post Content' }));
    const contentResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
      },
      body: formData,
    });
    const { IpfsHash: contentCID } = await contentResponse.json();
    console.log('Added post content:', contentCID);

    // Add the images to IPFS using Pinata
    const imageCIDs = await Promise.all(
      post.images.map(async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('pinataMetadata', JSON.stringify({ name: image.name }));
        const imageResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
          },
          body: formData,
        });
        const { IpfsHash: imageCID } = await imageResponse.json();
        return imageCID;
      })
    );
    console.log('Added post images:', imageCIDs);

    // Create a metadata object with the post details
    const metadata = {
      title: post.title,
      content: contentCID,
      images: imageCIDs,
    };

    if (options.useLocalNode) {
      return metadata;
    }

    // Upload the post to the server using the /api/files endpoint
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const { IpfsHash } = await response.json();
    return { IpfsHash };
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
};
export default uploapPost



