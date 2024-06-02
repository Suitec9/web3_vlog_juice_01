import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';
import { ethers } from 'ethers';
//import { create } from 'ipfs-http-client';

import { CONTRACT_ADDRESS, abi_ } from '@/constant';
//import { VlogJuiceABI } from '@/constant';
;
import fetchABI from '@/utils/fetchABI';
import pinFileToIPFS from '../api/pinFile';
//import  options  from '../api/pinFile';
//import ipfsClient from '../api/ipfs_00';

const ipfsURI = 'https://ipfs.io/ipfs/';

//const client = ;

//const abi = await fetchABI()

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);

interface Post {
  title: string;
  content: string;
  coverImage?: string;
  coverImagePath?: string;
  id?: number;
}

export default function Post() {
  const [post, setPost] = useState<Post | null>(null);
  const [editing, setEditing] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    if (!id) return;
    let provider;
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
      provider = new ethers.providers.JsonRpcProvider();
    } else if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'testnet') {
      provider = new ethers.providers.JsonRpcProvider('https://rpc-amoy.polygon.technology');
    } else {
      provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
    }
    
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi_, provider);
    const val = await contract.fetchPost(id);
    const postId = val[0].toNumber();

    const ipfsUrl = `${ipfsURI}/${id}`;
    const response = await fetch(ipfsUrl);
    const data = await response.json();
    if (data.coverImage) {
      let coverImagePath = `${ipfsURI}/${data.coverImage}`;
      data.coverImagePath = coverImagePath;
    }
    data.id = postId;
    setPost(data);
  }

  async function savePostToIpfs() {
    try {
      const added = await pinFileToIPFS(JSON.stringify(post));
      return added.toString();
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function updatePost() {
    const hash = await savePostToIpfs();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi_, signer);
    await contract.updatePost(post?.id, post?.title, hash, true);
    router.push('/');
  }

  if (!post) return null;

  return (
    <div className="container mx-auto">
      {editing && (
        <div>
          <input
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            name="title"
            placeholder="Give it a title ..."
            value={post.title}
            className="mt-10 border-none outline-none bg-inherit text-4xl font-bold placeholder:text-gray-500"
          />
          <SimpleMDE
            className="mt-10"
            placeholder="What's on your mind?"
            value={post.content}
            onChange={(value) => setPost({ ...post, content: value })}
          />
          <button
            className="bg-gray-100 outline-none border-none rounded-xl cursor-pointer mr-4 mt-6 text-lg px-10 py-4 shadow-lg"
            onClick={updatePost}
          >
            Update post
          </button>
        </div>
      )}
      {!editing && (
        <div>
          {post.coverImagePath && (
            <img src={post.coverImagePath} className="w-full" />
          )}
          <h1 className="text-4xl font-bold mt-10">{post.title}</h1>
          <div className="mt-10 border-l border-r border-gray-200 px-10">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      )}
      <button
        className="bg-gray-100 outline-none border-none rounded-xl cursor-pointer mr-4 mt-6 text-lg px-10 py-4 shadow-lg"
        onClick={() => setEditing(editing ? false : true)}
      >
        {editing ? 'View post' : 'Edit post'}
      </button>
    </div>
  );
}