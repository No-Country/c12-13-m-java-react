package com.spaces.spaces.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spaces.spaces.entities.Space;
import com.spaces.spaces.model.request.SpaceRequest;
import com.spaces.spaces.repo.SpaceRepo;

@Service
public class SpaceService {
    
    @Autowired
    SpaceRepo spaceRepo;

    public Space save(Space space){
        return spaceRepo.save(space);
    }

    public Space createSpace(SpaceRequest spaceRequest){
        Space space = new Space(spaceRequest.name, spaceRequest.description);
        return save(space);
    }

}
