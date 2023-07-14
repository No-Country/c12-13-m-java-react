package com.example.demo.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Map;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class ImageUploader {

    private Cloudinary cloudinary;

    @Autowired
    public ImageUploader(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(byte[] imageData, String fileName) {
        try {
            // Leer la imagen original desde los datos de imagen
            ByteArrayInputStream input = new ByteArrayInputStream(imageData);
            BufferedImage originalImage = ImageIO.read(input);
    
            // Redimensionar la imagen
            int newWidth = 800; // Especificar el ancho deseado
            int newHeight = 600; // Especificar la altura deseada
            Image resizedImage = originalImage.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);
            BufferedImage bufferedResizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
            bufferedResizedImage.getGraphics().drawImage(resizedImage, 0, 0, null);
    
            // Comprimir la imagen
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            ImageIO.write(bufferedResizedImage, "jpg", output);
            byte[] compressedImageBytes = output.toByteArray();
    
            // Subir la imagen comprimida a Cloudinary
            String imageUrl = cloudinary.uploader().upload(compressedImageBytes, ObjectUtils.asMap("folder", "uploads"))
                    .get("url").toString();
            System.out.println("imageUrl: " + imageUrl);
            return imageUrl;
        } catch (IOException e) {
            System.out.println("Cloudinary error: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

}
