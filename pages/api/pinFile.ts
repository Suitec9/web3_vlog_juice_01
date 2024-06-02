
/*const pinFileToIPFS = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("pinataMetadata", JSON.stringify({ name: "Vlog_Juice_01_Dapp", keyvalues: { } }));
  
    const options = {
      method: 'POST',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NDlkMDVjNS05N2Y5LTQ2OWUtODMzNC1kM2FmMThjMDAxYWYiLCJlbWFpbCI6ImNvbGxlY3RpdmVzaWdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI0ZmNkMjgyYjVmZjU2M2M5NmUxIiwic2NvcGVkS2V5U2VjcmV0IjoiMDU0YmVhZDk0ZTUxMmQxYzQ0Mjc4MzU0YzQ3MWM1YzM4M2I4YTFiOWU3OTFmNzhmMjJiYjMzZmM1NmQxZGU2MCIsImlhdCI6MTcxNTEzNTYyN30.uGE9jqzGfihm8H5vT9cYnIO_Jev6pGt78TVqWNGm9bQ",
        'Content-Type': 'application/json',
      },
      body: form,
    };
  
    console.log('Request options:',options)
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', options);
  
    if (!response.ok) {
      console.log("error pinning the file:")
    } else {
      console.error(`HTTP error ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };
  
  export default pinFileToIPFS;*/


const pinFileToIPFS = async (file: any): Promise<string> => {

  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer + ${process.env.TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashToPin: 'QmYfpETnFBb6JuXRAZSzYpi8aRJFjVEKUSvb9z7uW2rxXo' }),
    };

    const res = await fetch('https://api.pinata.cloud/pinning/pinByHash', options);

    if (!res.ok) {
      const errorData = await res.json();
    } else {
      console.error("error pinning the file:")
    }

    return await res.json();
  } catch (error) {
    console.error('Error pinning file to IPFS:', error);
    throw error;
  }
};

export default pinFileToIPFS;
  


