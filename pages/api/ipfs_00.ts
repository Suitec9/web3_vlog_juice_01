import { create } from "ipfs-http-client";

const TOKEN = ``
//const filebase_TOKEN = ""
const ipfsClient = async () => {
  const options = {
    method: 'POST',
    url: "Your api endpoint",
    protocol: 'http',
    headers: {
      authorization: 'Bearer ' + TOKEN,
    },
    
  };
  const client =  create(options)
  return client;
}
export default ipfsClient;
