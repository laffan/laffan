// pages/index.js
import Layout from "../components/Layout";
import ProjectListItems from "../components/ProjectListItems";
import getAllPosts from "./api/getAllPosts";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// import { default as mastConfig }  from "../phaser-blocks/mast";
// import { default as footerConfig }  from "../phaser-blocks/footer";

const PhaserBlock = dynamic(() => import("../components/PhaserBlock"), {
  ssr: false,
  loading: () => <p className="PhaserBlock__Loading">Loading ...</p>,
});

const Index = ({ projectsJSON }) => {
  
  const [gameConfig, setGameConfig] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevents setting state after unmount

    async function loadConfig() {
      const configModule = await import("../phaser-blocks/mast");
      const config = await configModule.default();

      if (isMounted) {
        setGameConfig(config);
      }
    }

    if (!gameConfig) {
      loadConfig();
    }

    return () => {
      isMounted = false;
    };
  }, []); // ✅ Only runs once when the component mounts


  return (
  <Layout pageName="Home">
    <section className="Mast">
      <div className="Mast__Decoration"></div>
      <div className="Mast__Text">
        <h1>Nate Laffan</h1>
        <h3>
          Ph.D. student in Computational Media at{" "}
          <a href="https://engineering.ucsc.edu/departments/computational-media/">
            UCSC
          </a>
        </h3>
      </div>
    </section>

    <section className="Tagline">
      <div className="Tagline__Interactive">
      {gameConfig ? <PhaserBlock gameConfig={gameConfig} /> : <p>Loading game...</p>}
      </div>
      <div className="Tagline__Text">
        <h3>I research how digital tools impact our memories and attention.</h3>
      </div>
    </section>

    <section className="Research">
      <div className="Research__Projects">
        <div className="Research__ProjectsText">
          <h2>Research</h2>
          <h3>Projects</h3>
          <h4>The Slow Spaces Project</h4>
          <p>
            In this study, we are interviewing design professionals who have
            experience designing for the physical world and are interested in
            reflective contemplation. We hope to learn from how they practice
            their craft, and find ways.
          </p>
        </div>
        <div className="Research__ProjectsImage"></div>
      </div>

      <h3>Papers</h3>
      <h4>Inscribe : Designing for Reflection in VR (CHI 2023)</h4>
      <p>
        At CHI 2023 I presented a prototype of a WebXR reflection space at the
        Reflection Workshop. The paper lays out basic considerations for
        designing reflective environments in VR, and will soon include a
        prototype you can use with your own VR headset. Interested? Sign up to
        get updates about the project.
      </p>
    </section>

    <section className="Works">
      <h2>Media Work</h2>
      <ul className="Works__Row">
        <ProjectListItems projectsJSON={projectsJSON} length={3} />
      </ul>
      <div className="Works__Middle">
        <a href={"https://github.com/laffan/digital-sketchbook"}>
          <div className="Works__MiddleText">
            <h3>Lookbook</h3>
            <p>
              A digital sketchbook, composed of half-baked ideas in Blender and
              P5.js
            </p>
          </div>
          <div className="Works__MiddleImg">
            <img src={"/img/lookbook.png"} />
          </div>
        </a>
      </div>
      <ul className="Works__Row">
        <ProjectListItems projectsJSON={projectsJSON} start={3} length={3} />
      </ul>
    </section>

    <section className="Contact">
      <h2>Contact</h2>

      <p>
        Get in touch via{" "}
        <a href="mailto:nlaffan@ucsc.edu" target="_blank">
          email
        </a>{" "}
        or{" "}
        <a href="https://www.github.com/laffan" target="_blank">
          github
        </a>{" "}
      </p>
    </section>

    <section className="Coliphon">
      <h2>Coliphon</h2>

      <p>Coliphon</p>
    </section>
  </Layout>
)};

export async function getStaticProps() {
  const allPosts = getAllPosts("projects");
  const projectsJSON = JSON.stringify(allPosts);

  return {
    props: { projectsJSON },
  };
}

export default Index;
