import  uploadPost  from './HandleFileUpload';

export interface PostFiles {
  title: string;
  content: string;
  coverImage: File | null;
}

export async function savePostToIpfs(post: PostFiles) {
  try {
    const { title, content, coverImage } = post;
    if (!coverImage) {
      throw new Error("No cover image provided");
    }
    const metadata = await uploadPost({
      title,
      content,
      images: [coverImage],
    }, { useLocalNode: false });

    console.log('Post uploaded to IPFS:', metadata);
    return metadata;
  } catch (err) {
    console.error('Error saving post to IPFS: ', err);
    throw new Error('Failed to save post to IPFS');
  }
}