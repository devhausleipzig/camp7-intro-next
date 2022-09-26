import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { postId } = router.query;

  if (!postId) return;

  return (
    <div>
      <h1>Post</h1>
      <p>{postId}</p>
    </div>
  );
}
