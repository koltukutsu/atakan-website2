import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { postquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import PostList from "@components/postlist";
import Image from "next/image";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;

  const router = useRouter();
  //console.log(router.query.category);

  const { data: posts } = usePreviewSubscription(postquery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  //console.log(posts);
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
  return (
    <>
      {/* {posts && siteConfig && ( */}
      {siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Stablo"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          <Container>
          <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          Yayınlarımız
        </h1>
            {/* <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-5xl text-gray-800 font-bold leading-none mb-3`}
            >
              ATAKAN BABA
            </h3>
            <p className={`text-gray-600`}>{firstItem?.description}</p>
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              className="h-6/6"
              src={firstItem?.img}
              alt={firstItem?.title}
            />
          </div>
        </div> */}
            
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      postdata: post,
      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
