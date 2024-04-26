package sk.student.tuke.sk.applikacia.services;

import org.springframework.stereotype.Service;
import sk.student.tuke.sk.applikacia.entities.Password;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;
import sk.student.tuke.sk.applikacia.repositories.PasswordRepository;

import java.util.List;

@Service
public class PasswordService implements ServiceInterface<Password> {
    private final PasswordRepository passwordRepository;

    public PasswordService(PasswordRepository passwordRepository) {
        this.passwordRepository = passwordRepository;
    }

    @Override
    public List<Password> getAll() throws DatabaseError {
        return passwordRepository.findAll();
    }

    @Override
    public void add(Password password) {
        passwordRepository.save(password);
    }

    @Override
    public void deleteById(Password password) {
        passwordRepository.deleteById(password.getId());
    }

    @Override
    public void deleteById(Long id) {
        passwordRepository.deleteById(id);
    }

    @Override
    public Password findById(Password password) throws DatabaseError {
        List<Password> passwords = this.getAll();
        for(Password passwordsList: passwords){
            if(passwordsList.getUser_id().equals(password.getId())){
                return passwordsList;
            }
        }
        return null;
    }

    @Override
    public Password findById(Long id) throws DatabaseError {
        List<Password> passwords = this.getAll();
        for(Password passwordsList: passwords){
            if(passwordsList.getUser_id().equals(id)){
                return passwordsList;
            }
        }
        return null;
    }

    @Override
    public Password findByName(String name) {
        return null;
    }
}
