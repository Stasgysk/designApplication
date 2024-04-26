package sk.student.tuke.sk.applikacia.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "passwords")
public class Password {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "password")
    private String password;

    public Password(Long user_id, String password) {
        this.user_id = user_id;
        this.password = password;
    }

    public Password() {

    }

    public String toJson() {
        return "\"Password{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", password='" + password + '\'' +
                '}';
    }
}
