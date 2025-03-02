import BlogList from '@/components/BlogList';

export const metadata = {
  title: '部落格',
  description: '',
};

export default function PostsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto p-6">
        <BlogList />
      </div>
    </main>
  );
}
