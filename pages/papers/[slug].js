import React from 'react'
import fs from 'fs'
import path from 'path'
import Layout from './../../components/Layout'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

// Import components for posts
import  SingleImage  from './../../posts/components/SingleImage'

export async function getStaticPaths() {
  const files = fs.readdirSync('./posts/projects')
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const source = fs
    .readFileSync(path.join('./posts/projects', slug + '.mdx'))
    .toString()

  const mdxSource = await serialize(source, { parseFrontmatter: true })

  return {
    props: { mdxSource },
  }
}

const Index = ({ mdxSource }) => {
  // ALL components must be added here.
  const components = {
    SingleImage,
  }
  console.log(mdxSource)
  return (
    <Layout pageName="Project">
      <div className="Project__Post">
        <a href="/projects">Back to Projects </a>
        <h1>{mdxSource.frontmatter.title}</h1>
        <h2>{mdxSource.frontmatter.subtitle}</h2>
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </Layout>
  )
}

export default Index
