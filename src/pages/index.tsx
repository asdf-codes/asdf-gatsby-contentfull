// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Img from 'gatsby-image'


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const ideas = data.allContentfulIdea.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {ideas.map(({ node }) => {
        const title = node.title || node.slug
        return (
          <article key={node.slug}>
            <header>
              <Img fluid={node.cover.fluid}/>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <small></small>
            </header>
            <section>
              <p>{node.title}</p> 
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulIdea {
      edges {
        node { 
          slug
          title
          cover {
          fluid {
           ...GatsbyContentfulFluid
              }
           }
        }
      }
    }
  }
`
