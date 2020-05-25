const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const ideaPost = path.resolve(`./src/templates/blog-idea-contentful.js`)
  const {data} = await graphql( `
    query {
      allContentfulIdea {
          edges { 
            node {
              slug 
              title
            }
          }  
        }
      }

    `
  )
 

  // Create blog ideas pages.
  const ideas = data.allContentfulIdea.edges

  ideas.forEach((idea, index) => {
    const previous = index === ideas.length - 1 ? null : ideas[index + 1].node
    const next = index === 0 ? null : ideas[index - 1].node

    actions.createPage({
      path: idea.node.slug,
      component: ideaPost,
      context: {
        slug: idea.node.slug,
        previous,
        next,
      },
    })
  })
}


