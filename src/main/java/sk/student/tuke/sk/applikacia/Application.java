package sk.student.tuke.sk.applikacia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import sk.student.tuke.sk.applikacia.demo.Some;

@SpringBootApplication
public class Application implements CommandLineRunner {

    private Some some;

    @Autowired
    public void setGameHandler(Some some) {
        this.some = some;
    }

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class).web(WebApplicationType.NONE).run(args);
    }

    @Override
    public void run(String... args) throws Exception {
        some.start();
    }
}
