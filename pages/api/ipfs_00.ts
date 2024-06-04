import { create } from "ipfs-http-client";

const TOKEN = ` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NDlkMDVjNS05N2Y5LTQ2OWUtODMzNC1kM2FmMThjMDAxYWYiLCJlbWFpbCI6ImNvbGxlY3RpdmVzaWdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI0ZmNkMjgyYjVmZjU2M2M5NmUxIiwic2NvcGVkS2V5U2VjcmV0IjoiMDU0YmVhZDk0ZTUxMmQxYzQ0Mjc4MzU0YzQ3MWM1YzM4M2I4YTFiOWU3OTFmNzhmMjJiYjMzZmM1NmQxZGU2MCIsImlhdCI6MTcxNTEzNTYyN30.uGE9jqzGfihm8H5vT9cYnIO_Jev6pGt78TVqWNGm9bQ`
//const filebase_TOKEN = ""
const ipfsClient = async () => {
  const options = {
    method: 'POST',
    url: "https://api.pinata.cloud/pinning/psa",
    protocol: 'http',
    headers: {
      authorization: 'Bearer ' + TOKEN,
    },
  //  body: JSON.stringify({hashToPin:'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn'})
    
  };
  const client =  create(options)
  return client;
}
export default ipfsClient;



//const helia = createHelia()

//const d = await dagJson(helia)

// "/ip4/127.0.0.1/tcp/5001"
/**{
  host: 'localhost',
  port: 5001,
  protocol: 'http',
  headers: {
    authorization: 'Bearer ' + TOKEN */