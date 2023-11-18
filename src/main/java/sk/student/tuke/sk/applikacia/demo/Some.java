package sk.student.tuke.sk.applikacia.demo;

import org.springframework.stereotype.Component;
import sk.student.tuke.sk.applikacia.entities.User;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;
import sk.student.tuke.sk.applikacia.services.ComponentService;
import sk.student.tuke.sk.applikacia.services.UserService;

import java.util.List;

@Component
public class Some {

    private final UserService userService;

    public Some(UserService userService, ComponentService componentService) {
        this.userService = userService;
    }

    public void start() throws DatabaseError {
        List<User> userList = userService.getAll();
        for (User user: userList){
            System.out.println(user.toString());
        }
        //userService.deleteUser(52);

        //userService.addUser(new User("new", "test"));
        userList = userService.getAll();
        for (User user: userList){
            System.out.println(user.toString());
        }
//        List<GraphicsComponent> graphicsComponentServices = componentService.list();
//        for (GraphicsComponent graphicsComponent : graphicsComponentServices){
//            System.out.printf(graphicsComponent.toString());
//        }
    }
}
