

const pinFileToIPFS = async (file: any): Promise<string> => {

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashToPin: 'your CID ' }),
    };

    const res = await fetch('https://api.pinata.cloud/pinning/pinByHash', options);

    if (!res.ok) {
      const errorData = await res.json();
    } else {
      console.error("error pinning the file:")
    }

    return  res.toString();
  } catch (error) {
    console.error('Error pinning file to IPFS:', error);
    throw error;
  }
};

export default pinFileToIPFS;
  


