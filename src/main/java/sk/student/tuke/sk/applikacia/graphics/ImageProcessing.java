package sk.student.tuke.sk.applikacia.graphics;

import ij.IJ;
import ij.ImagePlus;
import ij.io.FileSaver;
import ij.io.Opener;
import ij.process.ColorProcessor;

import java.awt.*;

public class ImageProcessing {
    private int width;
    private int height;
    private String backgroundColor;


    public ImageProcessing(int width, int height, String backgroundColor) {
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
    }

    public void createImage(){
        ColorProcessor processor = new ColorProcessor(width, height);

        // Set background color (white in this case)
        Color backgroundColor = Color.BLACK;
        processor.setColor(backgroundColor);

        // Fill the entire image with the background color
        processor.fill();

        // Create ImagePlus from ImageProcessor
        ImagePlus image = new ImagePlus("Simple Image", processor);
        ImagePlus image2 = new Opener().openImage("C:\\Users\\sglau\\Pictures\\Java test\\sorig.png");
        ImagePlus resultImage = addImages(image, image2);
        // Save the image
        FileSaver saver = new FileSaver(resultImage);
        saver.saveAsJpeg("C:\\Users\\sglau\\Pictures\\Java test\\image.jpg");
    }
    public static ImagePlus addImages(ImagePlus baseImage, ImagePlus overlayImage) {
        int baseWidth = baseImage.getWidth();
        int baseHeight = baseImage.getHeight();

        int overlayWidth = overlayImage.getWidth();
        int overlayHeight = overlayImage.getHeight();

        ImagePlus resultImage = IJ.createImage("Result", baseWidth, baseHeight, 1, baseImage.getBitDepth());

        resultImage.setRoi((baseWidth - overlayWidth) / 2, (baseHeight - overlayHeight) / 2, overlayWidth, overlayHeight);
        resultImage.getProcessor().copyBits(overlayImage.getProcessor(), 0, 0, 0);

        return resultImage;
    }

}
