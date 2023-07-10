package com.example.demo.resolver;

import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.CloudinaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.io.IOException;
import java.util.Date;

@Controller
public class UserController {

    @Autowired
    CloudinaryService cloudinaryService;

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository, CloudinaryService cloudinaryService) {
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
    }

    /*@PostMapping("/upload")
    public ResponseEntity<Map> upload(@RequestParam MultipartFile multipartFile) throws IOException{
        Map result = cloudinaryService.upload(multipartFile);
        return new ResponseEntity(result, HttpStatus.OK);
    } 
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map> upload(@RequestParam("id") String id) throws IOException{
        Map result = cloudinaryService.delete(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }*/

    @SchemaMapping(typeName = "Query", value = "findAllUsers")
    public List<User> findAll() {
        System.out.println("findAllUsers1");
        return userRepository.findAll();
    }

    @SchemaMapping(typeName = "Query", value = "findUserById")
    public User findOne(@Argument String id) {
        System.out.println("findUserById1 + " + id);
        // return userRepository.findById(id).orElseThrow(null);
        User user = userRepository.findById(id).orElseThrow(null);
        // List<Space> spaces = user.getSpaces();
        return user;
    }

    // Mutation
    @SchemaMapping(typeName = "Mutation", field = "createUser")
    public User createUser(@Argument String firstName,
            @Argument String email,
            @Argument String lastName,
            @Argument String password,
            @Argument String loginMethod,
            @Argument String username,
            @Argument MultipartFile profileImage,
            @Argument Boolean isSuperAdmin) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("El correo electrónico ya está en uso");
        } else {
            user.setEmail(email);
        }
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("El nombre de usuario ya está en uso");
        } else {
            user.setUsername(username);
        }
        user.setPassword(password);
        user.setLoginMethod(loginMethod);
        String profileImageUrl = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                Map profileImageUploadResult = cloudinaryService.upload(profileImage);
                profileImageUrl = (String) profileImageUploadResult.get("url");
            } catch (IOException e) {
                // Manejar el error de carga de imagen si es necesario
                e.printStackTrace();
            } 
        }
        if (profileImageUrl != null) {
            user.setProfileImage(profileImageUrl);
        }

        if (isSuperAdmin != null && !isSuperAdmin) {
            user.setIsSuperAdmin(isSuperAdmin);
        }
        user.setCreatedAt(new Date().toString());
        user.setUpdatedAt(new Date().toString());
        userRepository.save(user);
        return user;
    }

    @SchemaMapping(typeName = "Mutation", field = "deleteUser")
    public User deleteUser(@Argument String id) {
        User user = userRepository.findById(id).orElseThrow(null);
        userRepository.delete(user);
        return user;
    }

    @SchemaMapping(typeName = "Mutation", field = "editUser")
    public User editUser(@Argument String userId,
            @Argument String firstName,
            @Argument String email,
            @Argument String lastName,
            @Argument String username,
            @Argument String profileImage,
            @Argument Boolean isSuperAdmin,
            @Argument Boolean softDelete,
            @Argument String coverImage) {
        User user = userRepository.findById(userId).orElseThrow(null);

        if (user == null) {
            throw new IllegalArgumentException("El usuario no existe");
        }

        if (firstName != null && !firstName.isEmpty()) {
            user.setFirstName(firstName);
        }

        if (lastName != null && !lastName.isEmpty()) {
            user.setLastName(lastName);
        }

        if (email != null && !email.isEmpty()) {
            if (userRepository.existsByEmail(email)) {
                throw new IllegalArgumentException("El correo electrónico ya está en uso");
            } else {
                user.setEmail(email);
            }
        }

        if (username != null && !username.isEmpty()) {
            if (userRepository.existsByUsername(username)) {
                throw new IllegalArgumentException("El nombre de usuario ya está en uso");
            } else {
                user.setUsername(username);
            }
        }

        if (profileImage != null && !profileImage.isEmpty()) {
            user.setProfileImage(profileImage);
        }

        if (coverImage != null && !coverImage.isEmpty()) {
            user.setCoverImage(coverImage);
        }

        if (isSuperAdmin != null) {
            user.setIsSuperAdmin(isSuperAdmin);
        }

        if (softDelete != null) {
            user.setSoftDelete(softDelete);
        }

        user.setUpdatedAt(new Date().toString());
        userRepository.save(user);
        return user;

    }

}