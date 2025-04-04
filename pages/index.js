// pages/index.js (updated)
import Layout from "../components/Layout";
import ProjectListItems from "../components/ProjectListItems";
import getAllPosts from "./api/getAllPosts";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { loadMultiplePhaserConfigs } from "../utils/loadPhaserConfigs";

const PhaserBlock = dynamic(() => import("../components/PhaserBlock"), {
  ssr: false,
  loading: () => <div className="PhaserBlock__Loading"></div>,
});

const Index = ({ projectsJSON }) => {
  const [phaserConfigs, setPhaserConfigs] = useState({});
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    // Prevent multiple load attempts
    if (isConfigLoaded) return;

    let isMounted = true;

    async function loadConfigs() {
      try {
        // Load multiple configs
        const configs = await loadMultiplePhaserConfigs(["mast", "tagline"]);

        if (isMounted) {
          setPhaserConfigs(configs);
          setIsConfigLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load Phaser configs:", error);
      }
    }

    loadConfigs();

    return () => {
      isMounted = false;
    };
  }, [isConfigLoaded]);

  return (
    <Layout pageName="Home">
      <section className="Mast">

        <div className="Mast__Interactive" id="PhaserMast">
          {phaserConfigs["mast"] ? (
            <PhaserBlock
              gameConfig={phaserConfigs["mast"]}
              instanceId="mast-instance"
            />
          ) : (
            <div className="PhaserBlock__Loading"></div>
          )}
        </div>


        <div className="Mast__Text">
          <h1>Nate Laffan</h1>
          <h3>
            Ph.D. Student in Computational Media at{" "}
            <a href="https://engineering.ucsc.edu/departments/computational-media/">
              UCSC
            </a>
          </h3>
        </div>
      </section>

      <section className="Tagline">
        <div className="Tagline__Interactive" id="PhaserTagline">
          {phaserConfigs["tagline"] ? (
            <PhaserBlock
              gameConfig={phaserConfigs["tagline"]}
              instanceId="tagline-instance"
            />
          ) : (
            <div className="PhaserBlock__Loading"></div>
          )}
        </div>
        <div className="Tagline__Text">
          <h3>
            I research how digital tools impact our memories and attention.
          </h3>
        </div>
      </section>

      <section className="Research" id="research">
        <div className="Research__Projects">
          <div className="Research__ProjectsText">
            <h2>Research</h2>
            <h4>
              <a
                href="/pdf/Laffan_The_Slow_Space_Editor_MS.pdf"
                target="_blank"
              >
                The Slow Space Editor
              </a>
            </h4>

            <p>
              The Slow Space Editor is an XR tool designed to help users create
              personalized, restorative virtual environments for reflection and
              attention restoration, broadening access to contemplative spaces
              through an accessible 2D interface.
            </p>
          </div>
          <div className="Research__ProjectsImage">
            <img src="/img/slow-spaces.gif" />
          </div>
        </div>

        <h4>
          <a href="/pdf/Laffan_CHI_2023_InscribeVR.pdf" target="_blank">
            Inscribe : Designing for Reflection in VR (CHI 2023)
          </a>
        </h4>
        <p>
          At CHI 2023 I presented a prototype of a WebXR reflection space at the
          Reflection Workshop. The paper lays out basic considerations for
          designing reflective environments in VR, and will soon include a
          prototype you can use with your own VR headset. Interested? Sign up to
          get updates about the project.
        </p>
      </section>

      <section className="Works" id="media-works">
        <h2>Media Works</h2>
        <ul className="Works__Row">
          <ProjectListItems projectsJSON={projectsJSON} length={3} />
        </ul>
        <div className="Works__Middle">
          <a href={"https://github.com/laffan/lookbook"}>
            <div className="Works__MiddleText">
              <h3>Lookbook</h3>
              <p>A digital sketchbook of experiments in Blender and P5.js.</p>
            </div>
            <div className="Works__MiddleImg">
              <img src={"/img/lookbook.gif"}
                style={{mixBlendMode: "multiply"}}
               />
            </div>
          </a>
        </div>
        <ul className="Works__Row">
          <ProjectListItems projectsJSON={projectsJSON} start={3} length={3} />
        </ul>
      </section>

      <section className="Contact" id="contact">
        <div className="Contact__Text">
          <h2>Contact</h2>
          <p>
            In case you missed that top bit: I research how digital tools impact
            our memories and attention. My work focusses on memory studies,
            environmental psychology, reflection and externalized cognition.
          </p>

          <p>
            Currently, I am studying how the technologies that we use to extend
            our personal memories affect what (and how) we remember
            collectively.
          </p>

          <p>
            Before starting at UCSC, I was head of design at PolySync, an
            autonomous vehicle startup in Portland, Oregon. I've also worked in
            various freelance capacities as a designer, photographer,
            illustrator, developer and book binder.
          </p>
        </div>
        <div className="Contact__Links">
          <img src="/img/self.gif" />
          <ul>
            <li>
              <h4>Email</h4>
              <p>
                <a href="mailto:nlaffan@ucsc.edu">nlaffan@ucsc.edu</a>
              </p>
            </li>
            <li>
              <h4>Github</h4>
              <p>
                <a href="https://github.com/laffan" target="_blank">
                  @laffan
                </a>
              </p>
            </li>
            <li>
              <h4>Bluesky</h4>
              <p>
                <a
                  href="https://bsky.app/profile/nlfn.bsky.social"
                  target="_blank"
                >
                  @nlfn.bsky.social
                </a>
              </p>
            </li>
            <li>
              <h4>Soundcloud</h4>
              <p>
                <a href="https://soundcloud.com/natelaffan" target="_blank">
                  @nlfn
                </a>
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="Colophon" id="colophon">
        <h2>COLOPHON</h2>

        <p>
          Any website is only the very tip of an enormous iceberg of
          extraordinary applications and services, the vast majority of which
          are invisible to the end user, the designer and even the developer. Those that I am aware of I
          have listed below. If you are even partially responsible for any of
          them, you have my humble thanks. What a world we live in.
        </p>

        <div className="Colophon__Credits">
          <div className="Colophon__Column">
            <h4>FONTS</h4>
            <p>
              The headers are a combination of{" "}
              <a
                href="https://fonts.adobe.com/fonts/kaneda-gothic"
                target="_blank"
              >
                Kaneda Gothic
              </a>{" "}
              and{" "}
              <a href="https://fonts.adobe.com/fonts/calluna" target="_blank">
                Calluna
              </a>
              , courtesy of{" "}
              <a href="https://fonts.adobe.com/" target="_blank">
                Adobe Fonts
              </a>
              .{" "}
            </p>
            <h4>DEVELOPMENT</h4>
            <p>
              This is a{" "}
              <a href="https://nextjs.org/" target="_blank">
                Next.js
              </a>{" "}
              site (with some secret{" "}
              <a href="https://phaser.io/" target="_blank">
                Phaser
              </a>{" "}
              spice up top) that parses{" "}
              <a href="https://mdxjs.com/" target="_blank">
                MDX
              </a>{" "}
              for the project pages, coded mostly by hand but with some
              last-minute help from{" "}
              <a href="https://claude.ai" target="_blank">
                Claude
              </a>
              .
            </p>
          </div>
          <div className="Colophon__Column">
            <h4>TOOLS</h4>
            <p>
              Layout designed with{" "}
              <a href="https://www.sketch.com/" target="_blank">
                Sketch
              </a>
              . Halftone photo effect created using{" "}
              <a href="https://paragraphic.design/" target="_blank">
                Paragraphic
              </a>
              *. Magical rock garden generated with{" "}
              <a href="https://www.comfy.org/" target="_blank">
                ComfyUI
              </a>{" "}
              running{" "}
              <a
                href="https://huggingface.co/black-forest-labs/FLUX.1-schnell"
                target="_blank"
              >
                Flux.1
              </a>
              .{" "}
            </p>
            <p className="footnote">
              * An absolutely <b>brilliant</b> piece of software, created by a{" "}
              <a href="https://lostminds.com/" target="_blank">
                single developer
              </a>{" "}
              using{" "}
              <a href="https://godotengine.org/" target="_blank">
                Godot
              </a>{" "}
              . Check out the free trial if you haven't already.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const allPosts = getAllPosts("projects");
  const projectsJSON = JSON.stringify(allPosts);

  return {
    props: { projectsJSON },
  };
}

export default Index;
