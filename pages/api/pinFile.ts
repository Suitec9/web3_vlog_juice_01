import axios from "axios";
//import { options } from "./ipfs";

export const config = {
    api: {
      bodyParser: false,
    },
  };

   //const pinataApiKey = process.env.PINATA_PRIVATE_KEY;
   //const pinataSecretApiKey = process.env.PINATA_SECRET_KEY;


const pinFileToIPFS = async (cid: string) => {
    try {
        const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                hashToPin: cid,
            },
            {
                headers: {
                    //pinata_api_key: process.env.PINATA_PRIVATE_KEY,
                    //pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    Authorization: `Bearer ${process.env.TOKEN}`, 
                }
            }
        )
        console.log('Pinning file:', response.data);
    } catch (error) {
        console.error("Error pinning file:", error)
    }
};
export default pinFileToIPFS;




/**import { NextResponse, NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify({ name: "File to upload" }));
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: data,
    });
    const { IpfsHash } = await res.json();
    console.log(IpfsHash);

    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        if (err) {
          console.log({ err });
          return res.status(500).send("Upload Error");
        }
        const response = await saveFile(files.file);
        const { IpfsHash } = response;
  
        return res.send(IpfsHash);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  }

  const keyRestrictions = {
    keyName: 'Signed Upload JWT',
    maxUses: 1,
    permissions: {
      endpoints: {
        data: {
          pinList: false,
          userPinnedDataTotal: false
        },
        pinning: {
          pinFileToIPFS: true,
          pinJSONToIPFS: false,
          pinJobs: false,
          unpin: false,
          userPinPolicy: false
        }
      }
    }
  }
}*/



