package sk.student.tuke.sk.applikacia.services;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sk.student.tuke.sk.applikacia.entities.Project;
import sk.student.tuke.sk.applikacia.entities.User;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;
import sk.student.tuke.sk.applikacia.graphics.ImageProcessing;

import java.awt.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
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

            String path = "C:\\DesignApp\\Projects\\" + username + "\\" + body.get("projectname").toString() + "\\" + body.get("projectname").toString() + ".json";
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
    public Project getProjectById(@RequestBody String requestBody) throws JSONException, DatabaseError {
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
    @PostMapping(value = "/id/save", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public @ResponseBody byte[] saveProject(@RequestBody String requestBody) throws JSONException, IOException {
        JSONObject body = new JSONObject(requestBody);
        JSONObject project = (JSONObject) body.get("project");

        String projectName = project.get("name").toString();
        String defaultPath = "C:\\DesignApp\\Projects\\" + body.get("userName") + "\\" + projectName + "\\";
        new File(defaultPath).mkdirs();

        int height = Integer.parseInt(body.get("canvasHeight").toString());
        int width = Integer.parseInt(body.get("canvasWidth").toString());

        ImageProcessing imageProcessing = new ImageProcessing(width, height, Color.WHITE, defaultPath);
        imageProcessing.initBackground();

        JSONArray jsonArray = body.getJSONArray("pictures");
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = (JSONObject) jsonArray.get(i);
            JSONObject attrs = (JSONObject) jsonObject.get("attrs");
            int posX = (int) Float.parseFloat(attrs.get("x").toString());
            int posY = (int) Float.parseFloat(attrs.get("y").toString());
            String fileName = jsonObject.get("fileName").toString();
            float scaleX = Float.parseFloat(attrs.get("scaleX").toString());
            float scaleY = Float.parseFloat(attrs.get("scaleY").toString());
            double rotation = Double.parseDouble(attrs.get("rotation").toString());
            imageProcessing.addImages(posX, posY, jsonObject.get("data").toString(), fileName, scaleX, scaleY, rotation);
        }
        File file = new File(defaultPath + "background.png");
        InputStream inputStream = new FileInputStream(file);
        byte[] fileContent = inputStream.readAllBytes();
        inputStream.close();
        return fileContent;
    }
}
