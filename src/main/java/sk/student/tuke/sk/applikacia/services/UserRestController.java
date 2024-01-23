package sk.student.tuke.sk.applikacia.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import sk.student.tuke.sk.applikacia.entities.User;
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
    public void addUser(@RequestBody User user) throws DatabaseError {
        if(user.getEmail().isEmpty() || user.getUsername().isEmpty()){
            return;
            //JSONObject json = new JSONObject("{\"error\":\"username or email is empty\"}");
            //return new ResponseEntity<>(json, HttpStatus.BAD_REQUEST);
        }
        List<User> userList = userService.getAll();
        for(User userInList: userList) {
            if(userInList.getUsername().equals(user.getUsername()) || userInList.getEmail().equals(user.getEmail())){
                return;
                //JSONObject json = new JSONObject("{\"response\":\"Already exists!\"}");
                //return new ResponseEntity<>(json, HttpStatus.OK);
            }
        }
        userService.add(user);
        //JSONObject json = new JSONObject("{\"response\":\"Saved\"}");
        //return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @GetMapping("/")
    public User getUserByInfo(@RequestBody String requestBody) throws DatabaseError, JSONException {
        JSONObject body = new JSONObject(requestBody);

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
