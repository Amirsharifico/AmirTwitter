import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import CommentModal from "../components/CommentModal";

export default function Home({ newsResults, randomUsersResults }: any) {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen mx-auto">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed />

        {/* Widgets */}

        <Widgets
          newsResults={newsResults.articles}
          randomUsersResults={randomUsersResults.results}
        />

        {/* Modal */}
        <CommentModal/>
      </main>
    </div>
  );
}

//https://saurav.tech/NewsAPI/top-headlines/category/business/us.json
export async function getServerSideProps() {
  const newsResults = await fetch(
    // "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
    "https://saurav.tech/NewsAPI/everything/cnn.json"
  ).then((res) => res.json());

  // Who to follow section

  let randomUsersResults = [];

  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    );

    randomUsersResults = await res.json();
  } catch (e) {
    randomUsersResults = [];
  }
  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}
