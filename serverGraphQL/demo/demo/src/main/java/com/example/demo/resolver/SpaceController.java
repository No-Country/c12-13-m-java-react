package com.example.demo.resolver;

import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.model.Room;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoomRepository;
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
    private final RoomRepository roomRepository;

    public SpaceController(SpaceRepository spaceRepository, UserRepository userRepository,
            RoomRepository roomRepository) {
        this.spaceRepository = spaceRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;

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

    @SchemaMapping(typeName = "Mutation", field = "deleteSpace")
    public Space deleteSpace(@Argument String id) {
        // Borramos el espacio y todas las rooms que tenga
        Space space = spaceRepository.findById(id).orElseThrow(null);

        // Borramos todas las rooms del espacio
        space.getRooms().forEach(room -> {
            roomRepository.delete(room);
        });

        // Borramos el espacio del usuario
        space.getMembers().forEach(member -> {
            // Obtenemos el usuario
            User user = member.getUser();
            // Borramos el espacio del usuario
            user.getSpaces().remove(space);
            // Guardamos los cambios en el usuario
            userRepository.save(user);
        });

        // Borramos el espacio
        System.out.println(space);
        spaceRepository.delete(space);
        return space;
    }

    @SchemaMapping(typeName = "Mutation", field = "editSpace")
    public Space editSpace(@Argument String spaceId,
            @Argument String name,
            @Argument String description,
            @Argument String accessCode,
            @Argument String coverImage) {

        // Obtenemos el espacio
        Space space = spaceRepository.findById(spaceId).orElseThrow(null);

        // Actualizamos los datos
        if (name != null) {
            space.setName(name);
        }
        if (description != null) {
            space.setDescription(description);
        }
        if (accessCode != null) {
            space.setAccessCode(accessCode);
        }
        if (coverImage != null) {
            space.setCoverImage(coverImage);
        }

        space.setUpdatedAt(new Date().toString());

        // Guardamos los cambios
        spaceRepository.save(space);

        return space;
    }

}
