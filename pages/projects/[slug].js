import React from 'react'
import fs from 'fs'
import path from 'path'
import Layout from './../../components/Layout'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import  SingleImage  from './../../posts/components/SingleImage'
import  Album  from './../../posts/components/Album'

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
    Album
  }
  console.log(mdxSource)
  return (
    <Layout pageName="Project">
      
        <a className="Project__BackButton" href="/"><span>Home</span></a>
      <section className="Project__Post">
        <h1>{mdxSource.frontmatter.title}</h1>
        <MDXRemote {...mdxSource} components={components} />
      </section>
    </Layout>
  )
}

export default Index
