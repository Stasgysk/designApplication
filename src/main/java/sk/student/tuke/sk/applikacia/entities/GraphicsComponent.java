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
@Entity(name = "components")
public class GraphicsComponent {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "component_file")
    private byte[] file;

    private String name;

    private String description;

    public GraphicsComponent(byte[] file, String name, String description) {
        this.file = file;
        this.name = name;
        this.description = description;
    }

    protected GraphicsComponent() {

    }

    @Override
    public String toString() {
        return "Component{" +
                "id=" + id +
                ", file=" + Arrays.toString(file) +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
