package com.example.demo.resolver;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

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

    @SchemaMapping(typeName = "Query", value = "findUser")
    public User findOne(@Argument String id) {
        return userRepository.findById(id).orElseThrow(null);
    }

    // Mutation
    @SchemaMapping(typeName = "Mutation", field = "createUser")
    public User createUser(@Argument String firstName, @Argument String email, @Argument String lastName) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        // userRepository.save(user);
        System.out.println(user);
        return user;
    }
}