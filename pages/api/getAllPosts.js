import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

let postsDirectory = null;

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(slug => slug.slice(0,1) !== ".")
}

export function getPostBySlug(slug) {
  if ( slug.slice(0,1)===".") return;
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  var { data, content } = matter(fileContents);
  slug = slug.split(".")[0];
  return {...data, slug };
  return 
}

export function getAllPosts(dir) {
  postsDirectory = join(process.cwd(), 'posts/', dir);
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  return posts
}

export default getAllPosts;