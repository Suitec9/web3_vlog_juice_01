import { NextResponse, NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify({ name: "File to upload" }));
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
      },
      body: data,
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.message }, { status: res.status });
    }
    const { IpfsHash } = await res.json();
    console.log(IpfsHash);
    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    console.error("Error uploading file to IPFS:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}