import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Link from 'next/link';
import { AccountContext } from '../context/context';
import {  ownerAddress } from '@/config';
import { CONTRACT_ADDRESS, abi_ } from '@/constant';
import { RiArrowRightWideLine } from "react-icons/ri";
import VideoUploader from './juice-mode/page';
//import { stringify } from 'querystring';

interface props {
  posts: []
}
export default function Home({posts}:props) {
  
  const account = useContext(AccountContext);
  const router = useRouter();
  console.log("****CHECK******", router);

  async function navigate() {
    console.log("***$$$WHAT OR WHERE$$$$***YOU AT?", navigate())
    router.push('/create-post');
    //router.push('/juice-mode')
  }

  return (
    <div>
      <div className="mx-auto w-[700px] pt-12">
        {posts.map((post, index) => (
          <Link href={`/post/${post[2]}`} key={index} legacyBehavior>
          <a>
              <div className="mt-5 flex items-center justify-between rounded-lg border border-gray-300 p-5">
                <p className="m-0 cursor-pointer font-bold text-2xl">{post[1]}</p>
                <div className="flex justify-end pr-5">
                <RiArrowRightWideLine />
                </div>
              </div>
              </a>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        {account === ownerAddress && posts && !posts.length && (
         <button className="mt-24 flex items-center rounded-lg bg-gray-100 px-16 py-4 text-3xl shadow-md hover:bg-gray-200"
         onClick={navigate}
        >Create your first post<span className="ml-6">
        </span>
      </button>

        )}
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  let provider;
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider();
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-amoy.polygon.technology');
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.infura.io');
  }

  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi_, provider);
  const data = await contract.fetchAllPost();
  console.log("***LEVEL UP***:", data);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(data)),
    },
  };
}

