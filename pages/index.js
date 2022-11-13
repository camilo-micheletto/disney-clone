import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Section } from "../components/Section";

export const getStaticProps = async () => {

  const { ENDPOINT, GRAPH_CMS_TOKEN } = process.env

  const graphQLClient = new GraphQLClient(ENDPOINT, {
    headers: {
      "Authorizaton": GRAPH_CMS_TOKEN
    }
  })

  const videoQuery = gql`
    query {
      videos {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4{
          url
        }
      }
    }
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "cla1peqgy102p0blyfrk07bfa" }) {
        username,
        avatar { url }
      }
    }
  `;

  const { videos } = await graphQLClient.request(videoQuery)
  const { account } = await graphQLClient.request(accountQuery)

  return {
    props: {
      videos,
      account
    }
  }
}


const Home = ({ videos, account }) => {
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  const filterVideos = (genre) => videos.filter(video => video.tags.includes(genre));
  const unseenVideos = videos.filter(video => !video.seen)

  return (
    <>
      <Navbar account={account} />
      <main className="app">
        <header className="main-video">
          <img
            src={randomVideo.thumbnail?.url}
            alt={randomVideo.title}
          />
        </header>
        <section className="video-feed">
          <div className="featured">
            <Link href="#disney" className="featured__franchise">
              disney
            </Link>
            <Link href="#pixar" className="featured__franchise">
              pixar
            </Link>
            <Link href="#star-wars" className="featured__franchise">
              star-wars
            </Link>
            <Link href="#marvel" className="featured__franchise">
              marvel
            </Link>
          </div>
          <Section genre={"Recommended for you"} videos={unseenVideos} />
          <Section genre={"Family"} videos={filterVideos("family")} />
          <Section genre={"Adventure"} videos={filterVideos("adventure")} />
          <Section genre={"Disney"} videos={filterVideos("disney")} />
          <Section genre={"Drama"} videos={filterVideos("drama")} />
        </section>
      </main>
    </>
  )
}

export default Home;
