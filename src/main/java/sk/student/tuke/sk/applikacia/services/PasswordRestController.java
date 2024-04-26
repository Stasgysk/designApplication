package sk.student.tuke.sk.applikacia.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import sk.student.tuke.sk.applikacia.entities.Password;
import sk.student.tuke.sk.applikacia.entities.User;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;

import java.util.List;

@RestController
@RequestMapping("/api/users/password")
public class PasswordRestController {

    private final PasswordService passwordService;
    private final UserService userService;

    @Autowired
    public PasswordRestController(PasswordService passwordService, UserService userService) {
        this.passwordService = passwordService;
        this.userService = userService;
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/")
    @ResponseBody
    public String addPassword(@RequestBody String requestBody) {
        String jwtToken;
        try {
            JSONObject body = new JSONObject(requestBody);

            if(!body.has("email") || !body.has("username") || !body.has("password")) {
                return "{\"error\": \"Bad Request\"}";
            }

            String email = body.getString("email");
            String username = body.getString("username");
            String password = body.getString("password");

            User user = new User(username, email);
            userService.add(user);

            User savedUser = getUserByEmail(userService.getAll(), email);
            assert savedUser != null;
            jwtToken = new JwtVerify(savedUser.getUsername()).getToken();
            Password passwordObject = new Password(savedUser.getId(), password);
            passwordService.add(passwordObject);
        } catch (Exception e) {
            System.out.println(e);
            return "{\"error\": \"Somethind went wrong\"}";
        }



        return "{\"status\": \"Success\", \"jwt\":\""+ jwtToken +"\"}";
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/get")
    @ResponseBody
    public String getPassword(@RequestBody String requestBody) throws JSONException, DatabaseError {
        JSONObject body = new JSONObject(requestBody);
        List<User> userList = userService.getAll();
        String password = body.getString("password");
        if(body.has("email")) {
            String email = body.getString("email");
            User user = getUserByEmail(userList, email);
            if(user == null) {
                return "{\"error\": \"Not Found\"}";
            }
            return getUserJSON(user, password);
        } else if(body.has("username")) {
            String userName = body.getString("username");
            User user = getUserByName(userList, userName);
            if(user == null) {
                return "{\"error\": \"Not Found\"}";
            }
            return getUserJSON(user, password);
        }

        return "{\"error\": \"Bad Request\"}";
    }

    private String getUserJSON(User user, String passwordString) throws DatabaseError, JSONException {
        Password password = passwordService.findById(user.getId());

        if(password == null) {
            return "{\"error\": \"Not Found\"}";
        }

        if(password.getPassword().equals(passwordString)) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", user.getId());
            jsonObject.put("username", user.getUsername());
            jsonObject.put("email", user.getEmail());
            jsonObject.put("jwt", new JwtVerify(user.getUsername()).getToken());
            return jsonObject.toString();
        } else {
            return "{\"error\": \"Not authorized\"}";
        }
    }

    private User getUserByEmail(List<User> userList, String email) {
        for(User user: userList) {
            if(user.getEmail().equals(email)) {
                return user;
            }
        }
        return null;
    }

    private User getUserByName(List<User> userList, String name) {
        for(User user: userList) {
            if(user.getUsername().equals(name)) {
                return user;
            }
        }
        return null;
    }
}
