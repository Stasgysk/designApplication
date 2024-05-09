package sk.student.tuke.sk.applikacia.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;

@RestController
@RequestMapping("/api/components")
public class ComponentRestService {

    private final ComponentService componentService;


    @Autowired
    public ComponentRestService(ComponentService componentService) {
        this.componentService = componentService;
    }

    @CrossOrigin(origins = "#{${react.address}}")
    @PostMapping("/get")
    @ResponseBody
    public String getAll() throws DatabaseError {
        return componentService.getAll().toString();

    }
}
