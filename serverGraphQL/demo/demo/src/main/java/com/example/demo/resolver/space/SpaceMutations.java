package com.example.demo.resolver.space;

import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.SpaceRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class SpaceMutations {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private RoomRepository roomRepository;

    @SchemaMapping(typeName = "Mutation", field = "createSpace")
    public Space createSpace(
            @Argument String name,
            @Argument String description,
            @Argument String accessCode,
            @Argument String coverImage,
            @Argument String userOwner) {

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

        Space space = spaceRepository.findById(id).orElseThrow(null);

        // Borramos todas las rooms del espacio
        space.getRooms().forEach(room -> {
            roomRepository.delete(room);
        });

        // Borramos el espacio del usuario
        space.getMembers().forEach(member -> {
            User user = member.getUser();
            user.getSpaces().remove(space);
            userRepository.save(user);
        });
        spaceRepository.delete(space);
        return space;
    }

    @SchemaMapping(typeName = "Mutation", field = "editSpace")
    public Space editSpace(@Argument String spaceId,
            @Argument String name,
            @Argument String description,
            @Argument String accessCode,
            @Argument String coverImage) {
        Space space = spaceRepository.findById(spaceId).orElseThrow(null);

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
        spaceRepository.save(space);
        return space;
    }

    @SchemaMapping(typeName = "Mutation", field = "joinSpace")
    public Space joinSpace(@Argument String spaceId, @Argument String userId) {

        Space space = spaceRepository.findById(spaceId).orElseThrow(null);
        User user = userRepository.findById(userId).orElseThrow(null);

        if (space.getMembers().stream().anyMatch(member -> member.getUser().getId().equals(userId))) {
            return space;
        }

        Member member = new Member(user, "member");
        space.addMember(member);
        user.getSpaces().add(space);
        spaceRepository.save(space);
        userRepository.save(user);
        return space;
    }

    @SchemaMapping(typeName = "Mutation", field = "leaveSpace")
    public Space leaveSpace(@Argument String spaceId, @Argument String userId) {
        Space space = spaceRepository.findById(spaceId).orElseThrow(null);
        User user = userRepository.findById(userId).orElseThrow(null);

        space.getMembers().removeIf(member -> member.getUser().getId().equals(userId));
        user.getSpaces().removeIf(s -> s.getId().equals(spaceId));
        userRepository.save(user);
        space.getMembers().removeIf(member -> member.getUser().getId().equals(userId));
        spaceRepository.save(space);

        return space;
    }

}
