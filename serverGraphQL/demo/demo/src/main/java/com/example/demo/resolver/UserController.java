package com.example.demo.resolver;

import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import com.example.demo.utils.PasswordUtils;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.Date;

@Controller
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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
            @Argument String profileImage,
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
        String encryptedPassword = PasswordUtils.encryptPassword(password);
        user.setPassword(encryptedPassword);
        
        if (profileImage != null && !profileImage.isEmpty()) {
            user.setProfileImage(profileImage);
        }
        if (isSuperAdmin != null && !isSuperAdmin) {
            user.setIsSuperAdmin(isSuperAdmin);
        }
        if(loginMethod!=null && !loginMethod.isEmpty()){
         user.setLoginMethod(loginMethod);
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