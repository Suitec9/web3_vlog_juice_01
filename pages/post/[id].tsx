import ReactMarkdown from 'react-markdown';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ethers } from 'ethers';
import { AccountContext } from '../../context/context';
import { contractAddress, ownerAddress } from '@/config.mjs';
import { VlogJuiceABI } from '@/constant';
import { CID } from 'multiformats/cid';

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
  let provider;
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider();
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today');
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
  }

  const contract = new ethers.Contract(contractAddress, VlogJuiceABI, provider);
  const data = await contract.fetchPosts();

  const paths = data.map((d: CID[]) => ({ params: { id: d[2] } }));

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