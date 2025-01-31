import Layout from "../../components/Layout";
import Link from "next/link";
import getAllPosts from "./../api/getAllPosts";

const Index = ({ projectsJSON }) => {
  const projects = JSON.parse(projectsJSON);
  // const postsGrouped = groupBy(allPosts, p => format(parseISO(p.date), 'yyyy'));
  // const years = Object.keys(postsGrouped).reverse();

  const Project = ({ projectData: { title, slug, subtitle } }) => {
    return (
      <li className="Projects__Project">
        <Link href={"/projects/" + slug}>
          <h3>{title} </h3>
          <p>{subtitle}</p>
        </Link>
      </li>
    );
  };

  return (
    <Layout pageName="Projects">
      <div className="Projects__Content">
        <div className="Page__Header">
          <h1>projects</h1>
        </div>

        {projects.map((project, i) => (
          <Project key={`project${i}`} projectData={project} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const allPosts = getAllPosts("projects");
  const projectsJSON = JSON.stringify(allPosts);

  return {
    props: { projectsJSON },
  };
}
