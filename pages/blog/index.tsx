import { GetStaticProps } from "next";
import fs from "fs/promises";
import matter from "gray-matter";
import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  title: string;
  excerpt: string;
  created: string;
  tags: string[];
  slug: string;
};

interface Props {
  posts: Post[];
  tags: string[];
}

export default function Blog({ posts, tags }: Props) {
  const [tagFilter, setTagFilter] = useState("");
  useEffect(() => {
    console.log(tagFilter);
  }, [tagFilter]);
  return (
    <div className="space-y-4">
      <h1>Blog</h1>

      <select
        onChange={(event) => setTagFilter(event.target.value)}
        className="border p-2"
      >
        <option value="">---</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-8">
        {posts
          .filter((post) => {
            if (tagFilter) {
              return post.tags.includes(tagFilter);
            }
            return post;
          })
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="cursor-pointer aspect-square border p-6 space-y-2">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-gray-500 text-sm">{post.created}</p>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <div
                      key={tag}
                      className="py-1 px-2 bg-gray-200 rounded-full"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = await fs.readdir("__posts");
  let tags: string[] = [];
  const posts = await Promise.all(
    postsDirectory.map(async (fileName) => {
      const file = await fs.readFile(`__posts/${fileName}`, {
        encoding: "utf-8",
      });
      const { data: frontMatter } = matter(file);
      frontMatter.tags.forEach((tag: string) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      return {
        ...frontMatter,
        slug: fileName.replace(".md", ""),
      };
    })
  );

  return {
    props: {
      posts,
      tags: tags.sort(),
    },
  };
};
