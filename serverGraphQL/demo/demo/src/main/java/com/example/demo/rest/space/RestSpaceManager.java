package com.example.demo.rest.space;

import java.util.Date;

import org.checkerframework.checker.units.qual.A;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.utils.ImageUploader;
import com.example.demo.model.Space;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.model.Chat;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SpaceRepository;
import com.example.demo.repository.ChatRepository;
import com.example.demo.utils.ImageUploader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/rest/spaces") // Ruta base para todas las rutas del controlador
@CrossOrigin(origins = { "http://localhost:3000", "https://nocountry-c12-13.onrender.com" }) // Origen permitido para las solicitudes CORS
public class RestSpaceManager {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private ImageUploader imageUploader;

    @PostMapping("/create") // Ruta GET
    public ResponseEntity<String> createSpace(@RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("accessCode") String accessCode,
            @RequestParam("coverImage") MultipartFile coverImage,
            @RequestParam("userOwner") String userOwner,
            @RequestParam("filename") String filename
            ) {
        // obtenemos el body
        try {
            Space space = new Space();
            space.setName(name);
            space.setDescription(description);
            space.setAccessCode(accessCode);
            String imageUrl = imageUploader.uploadImage(coverImage.getBytes(), filename);
            space.setCoverImage(imageUrl);
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
            String id = space.getId();

            return ResponseEntity.ok(id);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }

    }

}
