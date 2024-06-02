"use server"
import { NextResponse, NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NDlkMDVjNS05N2Y5LTQ2OWUtODMzNC1kM2FmMThjMDAxYWYiLCJlbWFpbCI6ImNvbGxlY3RpdmVzaWdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI0ZmNkMjgyYjVmZjU2M2M5NmUxIiwic2NvcGVkS2V5U2VjcmV0IjoiMDU0YmVhZDk0ZTUxMmQxYzQ0Mjc4MzU0YzQ3MWM1YzM4M2I4YTFiOWU3OTFmNzhmMjJiYjMzZmM1NmQxZGU2MCIsImlhdCI6MTcxNTEzNTYyN30.uGE9jqzGfihm8H5vT9cYnIO_Jev6pGt78TVqWNGm9bQ";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify({ name: "Vlog_01_Dapp" }));
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'multipart/form-data'
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