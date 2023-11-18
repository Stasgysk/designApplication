package sk.student.tuke.sk.applikacia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sk.student.tuke.sk.applikacia.entities.GraphicsComponent;

@Repository
public interface ComponentRepository extends JpaRepository<GraphicsComponent, Long> {
}