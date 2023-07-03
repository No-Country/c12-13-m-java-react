package com.spaces.spaces.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spaces.spaces.entities.User;
import com.spaces.spaces.model.request.UserRequest;
import com.spaces.spaces.repo.UserRepo;
import com.spaces.spaces.services.UserService;

@RestController
public class UserController {
    
    @Autowired
    UserService userService;

    @Autowired
    UserRepo userRepo;

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody UserRequest userRequest){
        User user = userService.createUser(userRequest);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(){
        return ResponseEntity.ok(userService.getAllUser());
    }
}
