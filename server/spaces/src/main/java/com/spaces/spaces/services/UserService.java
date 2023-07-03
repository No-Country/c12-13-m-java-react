package com.spaces.spaces.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spaces.spaces.entities.User;
import com.spaces.spaces.model.request.UserRequest;
import com.spaces.spaces.repo.UserRepo;

@Service
public class UserService {
    
    @Autowired
    UserRepo userRepo;   

    public User save(User user){
        return userRepo.save(user);
    }

    public User createUser(UserRequest userRequest){
        User user = new User(userRequest.firstName, userRequest.lastName, userRequest.userName,userRequest.email, userRequest.password);
        return save(user);
    }

    public List<User> getAllUser(){
        return userRepo.findAll();
    }

}
