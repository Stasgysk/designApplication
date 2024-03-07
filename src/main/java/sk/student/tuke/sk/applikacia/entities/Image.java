package sk.student.tuke.sk.applikacia.entities;

import ij.ImagePlus;
import ij.io.FileSaver;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Image {
    private Integer width;
    private Integer height;
    private ImagePlus image;
    private String name;
    private FileSaver fileSaver;

    public Image(Integer width, Integer height, ImagePlus image, String name) {
        this.width = width;
        this.height = height;
        this.image = image;
        this.name = name;
        this.fileSaver = new FileSaver(this.image);
    }

    public void ImageSave(){
        this.fileSaver.save();
    }
}
