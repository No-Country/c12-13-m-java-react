package com.example.demo.resolver;

import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SessionRepository;

import com.example.demo.model.User;
import com.example.demo.model.Session;
//modelo de sesion de spring
//import org.springframework.session.data.mongo.MongoSession;

import java.util.Date;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;



@Controller
public class SessionController {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;

    public SessionController(UserRepository userRepository, SessionRepository sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }

    @SchemaMapping(typeName = "Mutation", field = "createSession")
    public Session createSession(@Argument String email, @Argument String password) {

        // Obtener el usuario por email
        User user = userRepository.findByEmail(email);

        if (isValidCredentials(email, password)) {
            System.out.println("createSession");
            Session session = new Session();
            session.setUserId(user.getId());
            session.setUserEmail(user.getEmail());
            //en formato final Date expireAt
            session.setExpireAt(Date.from(java.time.Instant.now().plusSeconds(86400)));
            sessionRepository.save(session);

            return session;
        } else {
            // Si las credenciales no son válidas, puedes lanzar una excepción o devolver un
            // mensaje de error
            throw new IllegalArgumentException("Credenciales inválidas");
        }
    }

    private boolean isValidCredentials(String email, String password) {
        // Aquí puedes implementar la lógica para verificar las credenciales del usuario
        // Puedes acceder a tu base de datos o sistema de autenticación para realizar la
        // verificación
        // Devuelve true si las credenciales son válidas, o false en caso contrario
        // Por simplicidad, este método siempre devuelve true en este ejemplo
        return true;
    }


}
