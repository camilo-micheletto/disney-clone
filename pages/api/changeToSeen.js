import { GraphQLClient } from "graphql-request";

const changeToSeen = async ({ body }, res) => {
  console.log("chamou patrau", { body });

  const graphcms = new GraphQLClient(process.env.ENDPOINT, {
    headers: { "Authorization": process.env.GRAPH_CMS_TOKEN }
  });

  await graphcms.request(`
    mutation($slug: String!) {
      updateVideo(
        where: { slug: $slug },
        data:{ seen: true }
      ) {
        id, title, seen
      }
    }
  `, { slug: body }
  )

  await await graphcms.request(`
    mutation publishVideo($slug: String!) {
      publishVideo(where: { slug: $slug }, to: PUBLISHED) {
        slug
      }
    }
  `, { slug: body })

  return res.status(201).json({ slug: body })
}

export default changeToSeen;