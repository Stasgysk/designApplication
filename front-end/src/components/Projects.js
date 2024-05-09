import '../pages/Home.css'
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

function Projects (props) {
    const [projects, setProjects] = useState({});
    const [cookies, setCookie , removeCookie] = useCookies(["jwtToken", "user", "projects"]);

    const onClick = event => {
        props.setCurrProject(event.currentTarget.id);
    }

    useEffect(() => {
        setProjects(cookies.projects);
    }, [cookies]);

    return (
      <div id="projects-container">
          <div id="projects-list">
              {projects &&
                  Object.keys(projects).map((key) => (
                      <div id={projects[key]["id"]} onClick={onClick} key={projects[key]["name"]} className="projects">
                          <h6>{parseInt(key) + 1}. {projects[key]["name"]}</h6>
                      </div>
                  ))
              }
          </div>
      </div>
    );
}

export default Projects;