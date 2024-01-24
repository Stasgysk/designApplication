package sk.student.tuke.sk.applikacia.services;

import org.springframework.stereotype.Service;
import sk.student.tuke.sk.applikacia.entities.User;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;
import sk.student.tuke.sk.applikacia.repositories.UserRepository;

import java.util.List;

@Service
public class UserService implements ServiceInterface<User> {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAll() throws DatabaseError {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseError("Database error : ", e);
        }
    }

    @Override
    public void add(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteById(User user) {
        userRepository.deleteById(user.getId());
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User findById(User user) throws DatabaseError {
        List<User> users = this.getAll();
        for(User userInList: users){
            if(userInList.getId().equals(user.getId())){
                return userInList;
            }
        }
        return null;
    }

    @Override
    public User findById(Long id) throws DatabaseError {
        List<User> users = this.getAll();
        for(User userInList: users){
            if(userInList.getId().equals(id)){
                return userInList;
            }
        }
        return null;
    }

    @Override
    public User findByName(String name) throws DatabaseError {
        List<User> users = this.getAll();
        for(User userInList: users){
            if(userInList.getUsername().equals(name)){
                return userInList;
            }
        }
        return null;
    }
}
