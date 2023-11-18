package sk.student.tuke.sk.applikacia.services;

import org.springframework.stereotype.Service;
import sk.student.tuke.sk.applikacia.entities.GraphicsComponent;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;
import sk.student.tuke.sk.applikacia.repositories.ComponentRepository;

import java.util.List;

@Service
public class ComponentService implements ServiceInterface<GraphicsComponent> {
    private final ComponentRepository componentRepository;

    public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    @Override
    public List<GraphicsComponent> getAll() throws DatabaseError {
        try {
            return componentRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseError("Database error : ", e);
        }
    }

    @Override
    public void add(GraphicsComponent graphicsComponent) {
        componentRepository.save(graphicsComponent);
    }

    @Override
    public void deleteById(GraphicsComponent graphicsComponent) {
        componentRepository.deleteById(graphicsComponent.getId());
    }

    @Override
    public void deleteById(Long id) {
        componentRepository.deleteById(id);
    }

    @Override
    public GraphicsComponent findById(GraphicsComponent graphicsComponent) throws DatabaseError {
        List<GraphicsComponent> graphicsComponents = this.getAll();
        for(GraphicsComponent graphicsComponentInList: graphicsComponents){
            if(graphicsComponentInList.getId().equals(graphicsComponent.getId())){
                return graphicsComponentInList;
            }
        }
        return null;
    }

    @Override
    public GraphicsComponent findById(Long id) throws DatabaseError {
        List<GraphicsComponent> graphicsComponents = this.getAll();
        for(GraphicsComponent graphicsComponentInList: graphicsComponents){
            if(graphicsComponentInList.getId().equals(id)){
                return graphicsComponentInList;
            }
        }
        return null;
    }
}
