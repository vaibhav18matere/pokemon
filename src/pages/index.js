import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Pokemon App">
      <h1 className="text-2xl text-center">Pokemon NextJS App</h1>
    </Layout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
