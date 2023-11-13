package sk.student.tuke.sk.applikacia.services;

import org.springframework.stereotype.Service;
import sk.student.tuke.sk.applikacia.entities.User;
import sk.student.tuke.sk.applikacia.interfaces.UserRepository;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> list() {
        return userRepository.findAll();
    }
}
