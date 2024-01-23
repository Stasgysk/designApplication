package sk.student.tuke.sk.applikacia;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Application implements CommandLineRunner {

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class).run(args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
