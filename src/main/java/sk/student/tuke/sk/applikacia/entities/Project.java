package sk.student.tuke.sk.applikacia.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

@Getter
@Setter
@Entity(name = "projects")
public class Project {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "project_file")
    private byte[] file;

    private String name;

    private Long userId;

    public Project(byte[] file, String name, Long userId) {
        this.file = file;
        this.name = name;
        this.userId = userId;
    }

    protected Project() {

    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", file=" + Arrays.toString(file) +
                ", name='" + name + '\'' +
                ", userId=" + userId +
                '}';
    }
}
