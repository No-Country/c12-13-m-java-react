package com.example.demo.resolver;

import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SpaceRepository;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;

@Controller
public class SpaceController {

    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;

    public SpaceController(SpaceRepository spaceRepository, UserRepository userRepository) {
        this.spaceRepository = spaceRepository;
        this.userRepository = userRepository;

    }

    @SchemaMapping(typeName = "Query", value = "findAllSpaces")
    public List<Space> findAll() {
        return spaceRepository.findAll();
    }

    @SchemaMapping(typeName = "Query", value = "findSpaceById")
    public Space findOne(@Argument String id) {
        return spaceRepository.findById(id).orElseThrow(null);
    }

    // Mutation
    @SchemaMapping(typeName = "Mutation", field = "createSpace")
    public Space createSpace(@Argument String firstName,
            @Argument String name,
            @Argument String description,
            @Argument String accessCode,
            @Argument String coverImage,
            @Argument String userOwner) {

        // Crear el espacio
        Space space = new Space();
        space.setName(name);
        space.setDescription(description);
        space.setAccessCode(accessCode);
        space.setCoverImage(coverImage);
        space.setCreatedAt(new Date().toString());
        space.setUpdatedAt(new Date().toString());
        spaceRepository.save(space);

        // Obtener el usuario correspondiente al userOwner
        User user = userRepository.findById(userOwner).orElseThrow(null);
        // Crear el miembro
        Member member = new Member(user, "admin");

        // Agregar el usuario al espacio
        space.addMember(member);
        // Agregar el espacio al usuario
        user.getSpaces().add(space);

        // Guardar los cambios en el usuario y el espacio
        userRepository.save(user);
        spaceRepository.save(space);

        return space;
    }

}
