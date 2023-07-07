package com.example.demo.resolver;

import com.example.demo.model.Room;
import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.repository.RoomRepository;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;

@Controller
public class RoomController {

    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;
    private final RoomRepository roomRepository;

    public RoomController(SpaceRepository spaceRepository, UserRepository userRepository,
            RoomRepository roomRepository) {
        this.spaceRepository = spaceRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;

    }

    @SchemaMapping(typeName = "Query", value = "findAllRooms")
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @SchemaMapping(typeName = "Query", value = "findRoomById")
    public Room findOne(@Argument String id) {
        return roomRepository.findById(id).orElseThrow(null);
    }

    // Mutation
    @SchemaMapping(typeName = "Mutation", field = "createRoom")
    public Room createRoom(
            @Argument String name,
            @Argument String description,
            @Argument String coverImage,
            @Argument String spaceOwnerId) {

        // Crear el room
        Room room = new Room();
        room.setName(name);
        room.setDescription(description);
        room.setCoverImage(coverImage);
        room.setCreatedAt(new Date().toString());
        room.setUpdatedAt(new Date().toString());
        roomRepository.save(room);
        // Obtener el espacio correspondiente al spaceOwner
        Space spaceOwner = spaceRepository.findById(spaceOwnerId).orElseThrow(null);
        // Agregar el room al espacio
        spaceOwner.getRooms().add(room);
        // Agregar el espacio al room
        room.setSpaceOwner(spaceOwner);
        // Guardar los cambios en el espacio y el room
        spaceRepository.save(spaceOwner);
        roomRepository.save(room);

        return room;
    }

    @SchemaMapping(typeName = "Mutation", field = "deleteRoom") 
    public Room deleteRoom(@Argument String id) {
        Room room = roomRepository.findById(id).orElseThrow(null);
        //Borramos la referencia del room en el espacio
        Space spaceOwner = room.getSpaceOwner();
        spaceOwner.getRooms().remove(room);
        spaceRepository.save(spaceOwner);
        roomRepository.delete(room);
        return room;
    }

}
