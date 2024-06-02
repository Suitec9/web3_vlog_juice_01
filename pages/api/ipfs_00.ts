import { create } from "ipfs-http-client";

const TOKEN = ``
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