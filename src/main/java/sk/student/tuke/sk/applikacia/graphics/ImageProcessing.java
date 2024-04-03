package sk.student.tuke.sk.applikacia.graphics;

import ij.ImagePlus;
import ij.io.FileSaver;
import ij.process.ColorProcessor;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class ImageProcessing {
    private final int width;
    private final int height;
    private final Color backgroundColor;
    private final String backgroundImagePath;
    private final String defaultImagesPath;


    public ImageProcessing(int width, int height, Color backgroundColor, String defaultImagesPath) {
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.defaultImagesPath = defaultImagesPath;
        this.backgroundImagePath = this.defaultImagesPath + "background.png";
    }

    public void initBackground(){
        ColorProcessor processor = new ColorProcessor(width, height);

        processor.setColor(this.backgroundColor);
        processor.fill();

        ImagePlus image = new ImagePlus("Simple Image", processor);

        FileSaver saver = new FileSaver(image);
        saver.saveAsJpeg(this.backgroundImagePath);
    }
    public void addImages(int posX, int posY, String base64Image, String fileName) throws IOException {
        byte[] data = Base64.decodeBase64(base64Image);

        try (OutputStream stream = new FileOutputStream(this.defaultImagesPath + fileName)) {
            stream.write(data);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        BufferedImage background = ImageIO.read(new File(this.backgroundImagePath));
        BufferedImage imageToAdd = ImageIO.read(new File(this.defaultImagesPath + fileName));

        Graphics g = background.getGraphics();
        g.drawImage(imageToAdd, posX, posY, null);
        ImageIO.write(background, "png", new File(this.backgroundImagePath));
    }

}
