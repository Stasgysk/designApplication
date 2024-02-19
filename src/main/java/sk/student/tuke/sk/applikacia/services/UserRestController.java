package sk.student.tuke.sk.applikacia.services;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import sk.student.tuke.sk.applikacia.entities.User;
import sk.student.tuke.sk.applikacia.entities.UserAuthResponse;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/")
    @ResponseBody
    public UserAuthResponse addUser(@RequestBody User user) throws DatabaseError {
        if(user.getEmail().isEmpty() || user.getUsername().isEmpty()){
            return null;
        }
        List<User> userList = userService.getAll();
        for(User userInList: userList) {
            if(userInList.getUsername().equals(user.getUsername()) || userInList.getEmail().equals(user.getEmail())){
                return null;
            }
        }
        String jwtToken = new JwtVerify(user.getUsername()).getToken();
        UserAuthResponse userAuthResponse = new UserAuthResponse(jwtToken, user);

        userService.add(user);
        return userAuthResponse;
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/get")
    @ResponseBody
    public User getUserByInfo(@RequestBody String requestBody) throws DatabaseError, JSONException {
        JSONObject body = new JSONObject(requestBody);

        if(body.has("jwt") && body.has("username")){
            String username = body.get("username").toString();
            JwtVerify jwtVerify = new JwtVerify(username);
            try {
                jwtVerify.verify(body.get("jwt").toString());
            } catch (JWTVerificationException exception) {
                return null;
            }
        }

        List<User> userList = userService.getAll();

        String key = "";
        String value = "";
        if (body.has("username")) {
            key = "username";
            value = body.get("username").toString();
        } else if (body.has("email")) {
            key = "email";
            value = body.get("email").toString();
        }

        for(User user: userList){
            switch (key){
                case "username":
                    if(user.getUsername().equals(value)){
                        return user;
                    }
                case "email":
                    if(user.getEmail().equals(value)){
                        return user;
                    }
            }
        }
        return null;
    }
}
