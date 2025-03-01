import { getAllPosts } from 'next-staticblog';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function BlogList({ limit }: { limit?: number }) {
  const posts = getAllPosts()
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, limit ?? getAllPosts().length);

  return (
    <section className="bg-orange-100 dark:bg-gray-800 p-4 my-8 rounded-xl space-y-6" id="contest">
      <h2 className="my-4 text-center text-4xl font-bold text-orange-500">部落格</h2>

      {posts.map((post) => (
        <Card key={post.slug} className=" bg-orange-300">
          <Link href={`/blogs/${post.slug}`}>
            <CardHeader>
              <CardTitle>{post.metadata.title}</CardTitle>
              <CardDescription>{post.metadata.publishedAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.metadata.description}</p>
            </CardContent>
            <CardFooter>
              {post.metadata.tags?.map((tag: string) => (
                <span key={tag} className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
              {limit && (
                <div className="flex justify-center my-6">
                  <Link
                    href="/blogs"
                    className="px-6 py-3 text-white text-lg font-semibold bg-orange-500 rounded-full shadow-md hover:bg-orange-600 transition-colors"
                  >
                    查看更多
                  </Link>
                </div>
              )}
            </CardFooter>
          </Link>
        </Card>
      ))}
    </section>
  );
}
