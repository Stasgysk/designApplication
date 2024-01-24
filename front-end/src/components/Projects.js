import '../pages/Main.css'
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

function Projects () {
    const [projects, setProjects] = useState({});
    const [cookies, setCookie , removeCookie] = useCookies(["jwtToken", "user", "projects"]);

    useEffect(() => {
        console.log(cookies.projects);
        setProjects(cookies.projects);
        console.log(projects);
    }, [projects, cookies]);

    return (
      <div>
          <ol id="projects-list">
              {Object.keys(projects).map(key => (
                  <li key={key}><a>{projects[key]["name"]}</a></li>
              ))}
          </ol>
      </div>
    );
}

export default Projects;