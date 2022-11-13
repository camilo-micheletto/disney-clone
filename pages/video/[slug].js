import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async (pageContext) => {
    const { ENDPOINT, GRAPH_CMS_TOKEN } = process.env
    const graphQLClient = new GraphQLClient(ENDPOINT, {
        headers: {
            "Authorizaton": GRAPH_CMS_TOKEN
        }
    })

    const pageSlug = pageContext.query.slug;
    const query = gql`
     query ($pageSlug: String!) {
        video(where: {slug: $pageSlug}) {
          createdAt
          id
          title
          description
          seen
          slug
          tags
          thumbnail {
            url
          }
          mp4 {
            url
          }
        }
      }      
    `
    const variables = { pageSlug };
    const { video } = await graphQLClient.request(query, variables)

    return {
        props: {
            video
        }
    }

}

const changeToSeen = async (slug) => {
    await fetch('/api/changeToSeen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(slug)
    })
}

const Video = ({ video }) => {
    const [watching, setWatching] = useState(false)

    return (
        <>
            {!watching && <>
                <img
                    src={video.thumbnail.url}
                    alt={video.title}
                    className="video-image"
                />
                <div className="video-image__info">
                    <p>{video.tags}</p>
                    <p>{video.description}</p>
                    <Link href={"/"}>Go back</Link>
                    <button
                        className="video-image__button"
                        onClick={() => {
                            changeToSeen(video.slug)
                            watching ? setWatching(false) : setWatching(true)
                        }}
                    >Play</button>
                </div>
            </>
            }
            {watching && (
                <video width={"100%"} controls>
                    <source src={video.mp4.url} type="video/mp4" />
                </video>
            )}
            <footer
                className="info-footer"
                onClick={() => watching && setWatching(false)}
            >

            </footer>
        </>
    )
}

export default Video;