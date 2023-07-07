package com.spaces.spaces.repo;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spaces.spaces.entities.User;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

}
