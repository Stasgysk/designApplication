package sk.student.tuke.sk.applikacia;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import sk.student.tuke.sk.applikacia.graphics.ImageProcessing;

@SpringBootApplication
public class Application implements CommandLineRunner {

    public static void main(String[] args) {
        System.setProperty("java.awt.headless", "false");
        new SpringApplicationBuilder(Application.class).run(args);
    }

    @Override
    public void run(String... args) throws Exception {
        ImageProcessing imageProcessing = new ImageProcessing(1000, 1000, "black");
        imageProcessing.createImage();
    }
}
