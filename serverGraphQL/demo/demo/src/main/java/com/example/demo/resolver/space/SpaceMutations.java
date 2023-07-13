package com.example.demo.resolver.space;

import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.model.Room;
import com.example.demo.model.Chat;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.repository.ChatRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.Date;

import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class SpaceMutations {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ChatRepository chatRepository;

    @SchemaMapping(typeName = "Mutation", field = "createSpace")
    public Space createSpace(
            @Argument String name,
            @Argument String description,
            @Argument String accessCode,
            @Argument String coverImage,
            @Argument String userOwner) {
                try {
                    System.out.println("Creando espacio...");

        Space space = new Space();
        space.setName(name);
        space.setDescription(description);
        space.setAccessCode(accessCode);
        space.setCoverImage(coverImage);
        space.setCreatedAt(new Date().toString());
        space.setUpdatedAt(new Date().toString());

        // Crear el espacio y guardarlo en la base de datos
        spaceRepository.save(space);
        System.out.println("Space id: " + space.getId());
        // Obtener el usuario correspondiente al userOwner
        User user = userRepository.findById(userOwner).orElseThrow(null);
        System.out.println("User id: " + user.getId());
        // Crear el miembro
        Member member = new Member(user, "admin");

        // Crear el chat y establecer el espacio
        System.out.println("Creando chat...");
        Chat chat = new Chat();
        // Guardar el chat en la base de datos
        chatRepository.save(chat);
        System.out.println("Chat id: " + chat.getId());
        // Agregar el chat al espacio
        space.setChat(chat);

        // Agregar el usuario como miembro del espacio
        space.addMember(member);

        // Agregar el espacio al usuario
        user.getSpaces().add(space);

        // Guardar los cambios en el usuario y el espacio
        userRepository.save(user);
        spaceRepository.save(space);

        return space;
    } catch (Exception e) {
        System.out.println(e.getMessage());
        return null;
    }
    }

    @SchemaMapping(typeName = "Mutation", field = "deleteSpace")
    public Space deleteSpace(@Argument String id) {
        try {

        Space space = spaceRepository.findById(id).orElseThrow(null);

        space.getRooms().forEach(room -> {
            roomRepository.delete(room);
        });

        // borrar el chat
        Chat chat = space.getChat();
        chatRepository.delete(chat);

        // Borramos el espacio del usuario
        space.getMembers().forEach(member -> {
            User user = member.getUser();
            user.getSpaces().remove(space);
            userRepository.save(user);
        });
        spaceRepository.delete(space);
        return space;
    } catch (Exception e) {
        System.out.println(e.getMessage());
        return null;
    }
    }

    @SchemaMapping(typeName = "Mutation", field = "editSpace")
    public Space editSpace(@Argument String spaceId,
            @Argument String name,
            @Argument String description,
            @Argument String accessCode,
            @Argument String coverImage) {
                try {
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
    } catch (Exception e) {
        System.out.println(e.getMessage());
        return null;
    }
    }

    @SchemaMapping(typeName = "Mutation", field = "joinSpace")
    public Space joinSpace(@Argument String spaceId, @Argument String userId) {
try {
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
    } catch (Exception e) {
        System.out.println(e.getMessage());
        return null;
    }
    }

    @SchemaMapping(typeName = "Mutation", field = "leaveSpace")
    public Space leaveSpace(@Argument String spaceId, @Argument String userId) {
        try {
        Space space = spaceRepository.findById(spaceId).orElseThrow(null);
        User user = userRepository.findById(userId).orElseThrow(null);

        space.getMembers().removeIf(member -> member.getUser().getId().equals(userId));
        user.getSpaces().removeIf(s -> s.getId().equals(spaceId));
        userRepository.save(user);
        space.getMembers().removeIf(member -> member.getUser().getId().equals(userId));
        spaceRepository.save(space);

        return space;
    } catch (Exception e) {
        System.out.println(e.getMessage());
        return null;
    }
    }

}
