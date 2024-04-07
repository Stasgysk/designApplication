package sk.student.tuke.sk.applikacia.graphics;

import ij.ImagePlus;
import ij.io.FileSaver;
import ij.process.ColorProcessor;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
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

    private int posX;
    private int posY;

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
    public void addImages(int posX, int posY, String base64Image, String fileName, float scaleX, float scaleY, double rotation) throws IOException {
        this.posX = posX;
        this.posY = posY;

        byte[] data = Base64.decodeBase64(base64Image);

        try (OutputStream stream = new FileOutputStream(this.defaultImagesPath + fileName)) {
            stream.write(data);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        BufferedImage background = ImageIO.read(new File(this.backgroundImagePath));
        BufferedImage imageToAdd = ImageIO.read(new File(this.defaultImagesPath + fileName));

        if(scaleY != 1 || scaleX != 1) {
            imageToAdd = scaleImage(scaleX, scaleY, imageToAdd);
        }

        if(rotation != 0) {
            imageToAdd = rotate(imageToAdd, rotation);
        }
        Graphics g = background.getGraphics();
        g.drawImage(imageToAdd, this.posX, this.posY, null);
        ImageIO.write(background, "png", new File(this.backgroundImagePath));
    }

    private BufferedImage scaleImage(float scaleX, float scaleY, BufferedImage imageToScale) {
        int targetWidth = (int) (scaleX * imageToScale.getWidth());
        int targetHeight = (int) (scaleY * imageToScale.getHeight());
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = resizedImage.createGraphics();
        graphics2D.drawImage(imageToScale, 0, 0, targetWidth, targetHeight, null);
        graphics2D.dispose();
        return resizedImage;
    }

    private BufferedImage rotate(BufferedImage imageToRotate, double angle) {
        angle = Math.toRadians(angle);
        double sin = Math.abs(Math.sin(angle));
        double cos = Math.abs(Math.cos(angle));
        int w = imageToRotate.getWidth();
        int h = imageToRotate.getHeight();
        int newWidth = (int) Math.floor(w * cos + h * sin);
        int newHeight = (int) Math.floor(h * cos + w * sin);
        BufferedImage rotatedImage = new BufferedImage(newWidth, newHeight, Transparency.TRANSLUCENT);
        Graphics2D g = rotatedImage.createGraphics();
        g.translate((newWidth - w) / 2, (newHeight - h) / 2);
        g.rotate(angle, w / 2, h / 2);
        g.drawRenderedImage(imageToRotate, null);
        g.dispose();

        Point2D[] rotatedCorners = new Point2D[4];
        Rectangle2D rotatedBounds = rotateRectangle(w, h, angle, rotatedCorners);
        this.posX += rotatedBounds.getX();
        this.posY += rotatedBounds.getY();
        System.out.println(posX + "x" + posY);
        return rotatedImage;
    }

    private Rectangle2D rotateRectangle(int originalWidth, int originalHeight, double angleRadians, Point2D[] rotatedCorners) {
        Point2D a0 = new Point2D.Double(0, 0);
        Point2D b0 = new Point2D.Double(originalWidth, 0);
        Point2D c0 = new Point2D.Double(0, originalHeight);
        Point2D d0 = new Point2D.Double(originalWidth, originalHeight);
        Point2D[] originalCorners = { a0, b0, c0, d0 };

        AffineTransform transform = AffineTransform.getRotateInstance(angleRadians);

        transform.transform(originalCorners, 0, rotatedCorners, 0, originalCorners.length);

        double minRotatedX = Double.POSITIVE_INFINITY;
        double maxRotatedX = Double.NEGATIVE_INFINITY;
        double minRotatedY = Double.POSITIVE_INFINITY;
        double maxRotatedY = Double.NEGATIVE_INFINITY;

        for (Point2D rotatedCorner: rotatedCorners) {
            minRotatedX = Math.min(minRotatedX, rotatedCorner.getX());
            maxRotatedX = Math.max(maxRotatedX, rotatedCorner.getX());
            minRotatedY = Math.min(minRotatedY, rotatedCorner.getY());
            maxRotatedY = Math.max(maxRotatedY, rotatedCorner.getY());
        }
        double rotatedWidth = maxRotatedX - minRotatedX;
        double rotatedHeight = maxRotatedY - minRotatedY;

        return new Rectangle2D.Double(minRotatedX, minRotatedY, rotatedWidth, rotatedHeight);
    }
}
