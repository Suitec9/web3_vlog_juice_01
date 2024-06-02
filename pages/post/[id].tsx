import ReactMarkdown from 'react-markdown';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ethers } from 'ethers';
import { AccountContext } from '../../context/context';
import {  ownerAddress } from '@/config';
import { CONTRACT_ADDRESS, abi } from '@/constant';
//import { CID } from 'multiformats/cid';
import { Networkish } from '@ethersproject/networks/lib/types';
//import fetchABI from '@/utils/fetchABI';

const ipfsURI = 'https://ipfs.io/ipfs/';

interface PostProps {
  post: {
    title: string;
    content: string;
    coverImage?: string;
  };
}

export default function Post({ post }: PostProps) {
  const account = useContext(AccountContext);
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {post && (
        <div className="mx-auto w-[900px]">
          {ownerAddress === account && (
            <div className="my-5">
              <Link href={`/edit-post/${id}`}>
                <a>Edit post</a>
              </Link>
            </div>
          )}
          {post.coverImage && (
            <img src={post.coverImage} className="w-[900px]" alt="Cover Image" />
          )}
          <h1>{post.title}</h1>
          <div className="mt-16 border-l border-r border-gray-300 px-10">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const newtorks: Networkish = {
    name: "polygon-amoy",
    chainId: 80002
   }
   const amoyRpc = 'https://polygon-amoy.drpc.org'
  let provider;
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider();
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider(amoyRpc, newtorks);
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
  }
 // const abi = await fetchABI();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  const data = await contract.fetchAllPost();
  console.log("****data**IS A fetch Function a view function**:", data); 

  const paths = data.map((d:any) => ({ params: { id: d[2] } }));

  return {
    paths,
    fallback: true,
  };
}

interface Params {
    params: {
        id: []
    }
}

export async function getStaticProps({ params }: Params) {
  const { id } = params;
  const ipfsUrl = `${ipfsURI}/${id}`;
  const response = await fetch(ipfsUrl);
  const data = await response.json();
  if (data.coverImage) {
    const coverImage = `${ipfsURI}/${data.coverImage}`;
    data.coverImage = coverImage;
  }

  return {
    props: {
      post: data,
    },
  };
}
