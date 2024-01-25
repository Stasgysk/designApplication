import '../pages/Main.css'
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
    }, [projects, cookies]);

    return (
      <div id="projects-container">
          <ol id="projects-list">
              {Object.keys(projects).map(key => (
                  <a id={projects[key]["id"]} onClick={onClick}>
                      <li key={key}>
                          <a>{projects[key]["name"]}</a>
                      </li>
                  </a>
              ))}
          </ol>
      </div>
    );
}

export default Projects;