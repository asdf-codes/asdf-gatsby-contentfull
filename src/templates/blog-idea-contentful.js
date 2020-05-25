import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIdea = ({ data, pageContext, location }) => {
  const idea = data.contentfulIdea
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={idea.title}
        
      />
      <article>
        <header>
          <Img fluid={idea.cover.fluid}/>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {idea.title}
          </h1>
        </header>
        <section dangerouslySetInnerHTML={{ __html: idea.content.childContentfulRichText.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogIdea

export const pageQuery = graphql`
  query ContentfulBlogIdea($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulIdea( slug: {eq: $slug }) {
      title
      cover {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      content {
        childContentfulRichText {
          html
        }
      }
    }
  }
`
