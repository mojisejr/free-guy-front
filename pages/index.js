import Head from "../components/head";
import Header from "../components/header";
import Body from "../components/body";
import Footer from "../components/footer";
import { getProjectInfo } from "./api/get-token-meta";

export default function Home(props) {
  return (
    <>
      <Head />
      <Header props={props} />
      <Body props={props} />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const info = await getProjectInfo();
  return {
    props: {
      ...info,
    },
  };
}
