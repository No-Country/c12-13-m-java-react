package com.spaces.spaces.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spaces.spaces.entities.Space;

@Repository
public interface SpaceRepo extends  MongoRepository<Space, String>{
    
}
