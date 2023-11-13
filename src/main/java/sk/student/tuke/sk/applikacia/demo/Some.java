package sk.student.tuke.sk.applikacia.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sk.student.tuke.sk.applikacia.entities.User;
import sk.student.tuke.sk.applikacia.services.UserService;

import java.util.List;

@Component
public class Some {

    @Autowired
    private UserService userService;

    public Some() {

    }

    public void start() {
        List<User> userList = userService.list();
        for (User user: userList){
            System.out.printf(user.toString());
        }
    }
}
