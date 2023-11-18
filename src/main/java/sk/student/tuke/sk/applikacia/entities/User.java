package sk.student.tuke.sk.applikacia.entities;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.util.List;

@Getter
@Setter
@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "user_name")
    private String username;

    private String firstname;

    private String surname;

    private String email;

    @Type(JsonBinaryType.class)
    private List<String> user_settings;

    private String phone_number;

    private String gender;

    private Integer age;

    public User(String username, @Nullable String firstname, @Nullable String surname, String email, @Nullable List<String> user_settings, @Nullable String phone_number, @Nullable String gender, @Nullable Integer age) {
        this.username = username;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.user_settings = user_settings;
        this.phone_number = phone_number;
        this.gender = gender;
        this.age = age;
    }

    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public User() {

    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", user_settings=" + user_settings +
                ", phone_number='" + phone_number + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
