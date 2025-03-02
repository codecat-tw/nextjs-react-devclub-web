import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarIcon } from 'lucide-react'; // You may need to install lucide-react
import { getAllPostParams, getPostBySlug } from 'next-staticblog';
import Link from 'next/link';
import { use } from 'react';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export async function generateStaticParams() {
  return getAllPostParams();
}

export default function Page(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const post = getPostBySlug(params.slug);

  return (
    <div className="flex justify-center grow bg-secondary text-foreground">
      <div className="flex flex-col items-center grow">
        <div className="mx-auto sm:rounded-xl sm:mt-4 sm:mb-2 w-[60rem]">
          <Link href="/blogs">
            <Button className="bg-primary w-auto">
              <ArrowLeft /> Back
            </Button>
          </Link>
        </div>
        <div className="grow mx-auto p-4 bg-background sm:rounded-xl sm:m-2 w-[60rem] border-2 border-gray-800">
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800">{post.metadata.title}</h1>

            {/* Meta information container */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-6 mt-3">
              {/* Date with icon */}
              <div className="flex items-center text-gray-600 mb-2 sm:mb-0">
                <CalendarIcon size={16} className="mr-1" />
                <time dateTime={post.metadata.publishedAt}>{post.metadata.publishedAt}</time>
              </div>

              {/* Tags */}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.metadata.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block border border-orange-400 text-orange-800 px-2 py-0.5 rounded text-xs hover:bg-orange-50 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="prose mt-4 prose-headings:text-gray-800 prose-a:text-orange-500 prose-a:hover:text-orange-500/80">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
