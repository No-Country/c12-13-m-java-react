package com.example.demo.resolver.space;

import com.example.demo.model.Space;
import com.example.demo.repository.SpaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
public class SpaceQueries {

    @Autowired
    private SpaceRepository spaceRepository;

    @SchemaMapping(typeName = "Query", value = "findAllSpaces")
    public List<Space> findAll() {
        return spaceRepository.findAll();
    }

    @SchemaMapping(typeName = "Query", value = "findSpaceById")
    public Space findOne(@Argument String id) {
        return spaceRepository.findById(id).orElseThrow(null);
    }

}
