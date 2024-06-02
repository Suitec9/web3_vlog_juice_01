
import '../styles/globals.css';
import { useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { AccountContext } from '../context/context';
//import { ownerAddress } from '../config.mjs';
import 'easymde/dist/easymde.min.css';
import { NextPage } from 'next/types';
import { AppProps } from 'next/app';

interface MyAppProps extends AppProps {
  Component: NextPage & {
    connect?: () => Promise<void>;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
 //const [accounts, setAccounts] = useState<[]>();

 const [account, setAccount] = useState<string | null>(null);
 async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: process.env.QUIKNODE_HTTP_URL,
            },
          },
        },
      },
    });
    return web3Modal;
  }
  //const provider = new ethers.providers.Web3Provider(window.ethereum) 
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const account = await provider.listAccounts();
      setAccount(account[0]);
    } catch (err) {
      console.error('Error connecting to wallet:', err);
    }
  }

  return (
    <div>
      <nav className="bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <Link href="/" legacyBehavior>
            <a>
              <img src="/logo.svg" alt="React Logo" className="w-12" />
              </a>
          </Link>
          <Link href="/" passHref legacyBehavior>
            <a className="flex justify-between items-center w-full">
              <div className='flex items-center'>
                <img src='/logoII.png' alt='Logo' className='h-12 mr-2'/>
                <h2 className="font-semibold">Vlog</h2>
              </div>
                 <div className="flex flex-col items-start">
                <p className="text-purple-500">WEB3</p>
               <p className="text-gray-900">Block-Magik</p>
              </div>
            </a>
          </Link>
          {!account && (
            <div>
              <button
                className="rounded-lg bg-gray-100 px-4 py-2 text-lg shadow-md hover:bg-gray-200"
                onClick={connect}
              >
                Connect
              </button>
            </div>
          )}
          {account && <p className="text-sm">{account}</p>}
        </div>
        <div className="bg-gray-100 px-12 py-6">
          <Link href="/" rel='prefetch' legacyBehavior>
            <a className="border-spacing-0 rounded-lg mr-8 text-lg font-medium">Home</a>
          </Link>
          
            <Link rel='prefetch' legacyBehavior  href="/create-post" >
              <a className=" border-spacing-0 rounded-lg text-lg font-medium">Create Post</a>
            </Link>

            <Link rel='prefetch' legacyBehavior href={"/juice-mode/page"}>
              <a className=" border-spacing-5 rounded-lg ml-8 text-lg font-blod">Upload Video</a>
            </Link>
          
        </div>
      </nav>
      <div className="p-10">
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  );
}

export default MyApp;

