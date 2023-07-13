package com.example.demo.resolver.session;

import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SessionRepository;
import com.example.demo.model.User;
import com.example.demo.model.Session;
import com.example.demo.utils.PasswordUtils;
import java.util.Date;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class SessionMutations {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SessionRepository sessionRepository;

    @SchemaMapping(typeName = "Mutation", field = "createSession")
    public Session createSession(@Argument String email, @Argument String password) {
        User user = userRepository.findByEmail(email);
        Boolean isPasswordMatch = PasswordUtils.isPasswordMatch(password, user.getPassword());
        if (isPasswordMatch) {
            System.out.println("Credenciales válidas");
            return createNewSession(user);
        } else {
            System.out.println("Credenciales inválidas");
            throw new IllegalArgumentException("Credenciales inválidas");
        }
    }

    private Session createNewSession(User user) {
        Session sessionActive = sessionRepository.findByUserId(user.getId());
        if (sessionActive != null) {
            sessionRepository.delete(sessionActive);
        }

        Session session = new Session();
        session.setUserId(user.getId());
        session.setUserEmail(user.getEmail());
        session.setExpireAt(Date.from(java.time.Instant.now().plusSeconds(86400)));
        sessionRepository.save(session);

        return session;
    }
}
