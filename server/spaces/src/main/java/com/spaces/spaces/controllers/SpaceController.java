package com.spaces.spaces.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spaces.spaces.entities.Space;
import com.spaces.spaces.model.request.SpaceRequest;
import com.spaces.spaces.repo.SpaceRepo;
//import com.spaces.spaces.repo.SpaceRepo;
import com.spaces.spaces.services.SpaceService;



@RestController
public class SpaceController {
    
    @Autowired
    SpaceService spaceService;
    @Autowired
    SpaceRepo spaceRepo;





    @PostMapping("/space")
    public ResponseEntity<Space> createSpace(@RequestBody SpaceRequest spaceRequest){
        Space space = spaceService.createSpace(spaceRequest);
        return ResponseEntity.ok(space);
    }
}
