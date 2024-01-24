package sk.student.tuke.sk.applikacia.services;

import org.springframework.stereotype.Service;
import sk.student.tuke.sk.applikacia.entities.Project;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;
import sk.student.tuke.sk.applikacia.repositories.ProjectRepository;

import java.util.List;

@Service
public class ProjectService implements ServiceInterface<Project> {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<Project> getAll() throws DatabaseError {
        try {
            return projectRepository.findAll();
        } catch (Exception e) {
            throw new DatabaseError("Database error : ", e);
        }
    }

    @Override
    public void add(Project project) {
        projectRepository.save(project);
    }

    @Override
    public void deleteById(Project project) {
        projectRepository.deleteById(project.getId());
    }

    @Override
    public void deleteById(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public Project findById(Project project) throws DatabaseError {
        List<Project> projects = this.getAll();
        for(Project projectInList: projects){
            if(projectInList.getId().equals(project.getId())){
                return projectInList;
            }
        }
        return null;
    }

    @Override
    public Project findById(Long id) throws DatabaseError {
        List<Project> projects = this.getAll();
        for(Project projectInList: projects){
            if(projectInList.getId().equals(id)){
                return projectInList;
            }
        }
        return null;
    }

    @Override
    public Project findByName(String name) throws DatabaseError {

        return null;
    }
}
