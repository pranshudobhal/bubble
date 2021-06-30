import { NewPost } from './NewPost';
import { Posts } from './Posts';

export const Home = () => {
  return (
    <main className="min-h-screen py-8 bg-gray-50">
      <div className="w-6/7 mx-auto md:w-5/7 lg:w-4/7 xl:w-3/7">
        <NewPost />
        <Posts />
      </div>
    </main>
  );
};
