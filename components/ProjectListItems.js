// components/ProjectList.js
import Link from "next/link";

const ProjectListItems = ({ projectsJSON, start = 0, length = 10 }) => {
  const projects = JSON.parse(projectsJSON);
  const slicedProjects = projects.slice(start, start + length);

  const Project = ({ projectData: { title, slug, subtitle } }) => {
    return (
      <li>
        <Link href={"/projects/" + slug}>
        <div className="ProjectThumb">
          <img src={"/posts/projects/" + slug + "/thumb.jpg"} alt={title} />
        </div>
          <h3>{title}</h3>
        <p>{subtitle}</p>
        </Link>
      </li>
    );
  };

  return (
    <>
      {slicedProjects.map((project, i) => (
        <Project key={`project${start + i}`} projectData={project} />
      ))}
    </>
  );
};

export default ProjectListItems;
