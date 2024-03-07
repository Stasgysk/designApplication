package sk.student.tuke.sk.applikacia.services;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sk.student.tuke.sk.applikacia.entities.Project;
import sk.student.tuke.sk.applikacia.entities.User;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectRestController {

    private final ProjectService projectService;
    private final UserService userService;
    @Autowired
    public ProjectRestController(ProjectService projectService, UserService userService) {
        this.projectService = projectService;
        this.userService = userService;
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/get")
    @ResponseBody
    public List<Project> getAllProjects(@RequestBody String requestBody) throws JSONException, DatabaseError {
        JSONObject body = new JSONObject(requestBody);

        if(body.has("jwt") && body.has("username")) {
            String token = body.get("jwt").toString();
            String username = body.get("username").toString();
            JwtVerify jwtVerify = new JwtVerify(username);
            try {
                jwtVerify.verify(token);
            } catch (JWTVerificationException exception) {
                return null;
            }

            User user = userService.findByName(username);
            List<Project> projectList = this.projectService.getAll();
            List<Project> responseProjects = new ArrayList<>();
            for(Project project: projectList) {
                if(project.getUserId().equals(user.getId())) {
                    responseProjects.add(project);
                }
            }
            return responseProjects;
        }
        return null;
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/")
    @ResponseBody
    public Project addProject(@RequestBody String requestBody) throws JSONException, DatabaseError, IOException {
        JSONObject body = new JSONObject(requestBody);

        if(body.has("jwt") && body.has("username") && body.has("projectname")) {
            String token = body.get("jwt").toString();
            String username = body.get("username").toString();
            JwtVerify jwtVerify = new JwtVerify(username);
            try {
                jwtVerify.verify(token);
            } catch (JWTVerificationException exception) {
                return null;
            }

            String path = "C:\\DesignApp\\Projects\\" + username + "\\" + body.get("projectname").toString() + ".json";
            File projectFile = new File(path);
            projectFile.getParentFile().mkdirs();
            projectFile.createNewFile();
            byte[] fileContent = Files.readAllBytes(projectFile.toPath());
            User user = userService.findByName(username);
            Project project = new Project(fileContent, body.get("projectname").toString(), user.getId());
            projectService.add(project);
            return project;
        }
        return null;
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/id")
    @ResponseBody
    public Project getProjectById(@RequestBody String requestBody) throws JSONException, DatabaseError, IOException {
        JSONObject body = new JSONObject(requestBody);

        if(body.has("jwt") && body.has("id") && body.has("username")) {
            String token = body.get("jwt").toString();
            Long id = Long.parseLong(body.get("id").toString());
            String username = body.get("username").toString();
            JwtVerify jwtVerify = new JwtVerify(username);
            try {
                jwtVerify.verify(token);
            } catch (JWTVerificationException exception) {
                return null;
            }
            return projectService.findById(id);
        }
        return null;
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/id/save")
    @ResponseBody
    public JSONObject saveProject(@RequestBody String requestBody, @RequestPart("images") MultipartFile[] images) throws JSONException {
        JSONObject body = new JSONObject(requestBody);

        if(body.has("jwt") && body.has("id") && body.has("username")) {
            String token = body.get("jwt").toString();
            Long id = Long.parseLong(body.get("id").toString());
            String username = body.get("username").toString();
            JwtVerify jwtVerify = new JwtVerify(username);
            try {
                jwtVerify.verify(token);
            } catch (JWTVerificationException exception) {
                return new JSONObject("{\"error\": \"Not authorized\"}");
            }
        }

        if(body.has("images")) {
            JSONObject imagesInfo = (JSONObject) body.get("images");
            imagesInfo.keys().forEachRemaining(key -> {
                try {
                    JSONObject value = (JSONObject) imagesInfo.get((String)key);
                    Integer width = (Integer) value.get("width");
                    Integer height = (Integer) value.get("height");
                    String name = value.get("name").toString();
                    for (int i = 0; i < images.length; i++) {
                        byte[] bytes = images[i].getBytes();
                    }
                } catch (JSONException | IOException e) {
                    throw new RuntimeException(e);
                }
            });

        }

        return new JSONObject("{\"status\": \"Saved\"}");
    }
}
