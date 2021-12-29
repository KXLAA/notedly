import Header from 'components/common/Header';
import LandingPage from 'components/home/LandingPage';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>notedly</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Header />
        <LandingPage />
      </>
    </>
  );
}
