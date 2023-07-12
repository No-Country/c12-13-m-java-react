// package com.example.demo.resolver;

// import com.example.demo.repository.UserRepository;
// import com.example.demo.repository.SessionRepository;

// import com.example.demo.model.User;
// import com.example.demo.model.Session;
// //modelo de sesion de spring
// //import org.springframework.session.data.mongo.MongoSession;

// import com.example.demo.utils.PasswordUtils;

// import java.util.Date;

// import org.springframework.graphql.data.method.annotation.Argument;
// import org.springframework.graphql.data.method.annotation.SchemaMapping;
// import org.springframework.stereotype.Controller;

// @Controller
// public class SessionController {

//     private final UserRepository userRepository;
//     private final SessionRepository sessionRepository;

//     public SessionController(UserRepository userRepository, SessionRepository sessionRepository) {
//         this.userRepository = userRepository;
//         this.sessionRepository = sessionRepository;
//     }

//     @SchemaMapping(typeName = "Mutation", field = "createSession")
//     public Session createSession(@Argument String email, @Argument String password) {

//         // Obtener el usuario por email
//         User user = userRepository.findByEmail(email);
//         Boolean isPasswordMatch = PasswordUtils.isPasswordMatch(password, user.getPassword());
//         if (isPasswordMatch) {
//             return createNewSession(user);
//         } else {
//             // Si las credenciales no son válidas, puedes lanzar una excepción o devolver un
//             // mensaje de error
//             throw new IllegalArgumentException("Credenciales inválidas");
//         }
//     }

//     @SchemaMapping(typeName = "Query", field = "verifySession")
//     public Boolean verifySession(@Argument String userId) {
//         Session session = sessionRepository.findByUserId(userId);
//         if (session != null) {
//             return true;
//         } else {
//             return false;
//         }
//     }


//     private Session createNewSession(User user) {
//         // Verificar si existe una sesión activa
//         Session sessionActive = sessionRepository.findByUserId(user.getId());
//         if (sessionActive != null) {
     
//             sessionRepository.delete(sessionActive);
//         }

//         Session session = new Session();
//         session.setUserId(user.getId());
//         session.setUserEmail(user.getEmail());
//         session.setExpireAt(Date.from(java.time.Instant.now().plusSeconds(86400)));
//         sessionRepository.save(session);

//         return session;
//     }    
// }
