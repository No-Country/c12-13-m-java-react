package com.example.demo.resolver.tasks;

import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.Member;
import com.example.demo.model.Task;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import java.util.ArrayList;
import java.util.Date;

@Controller
public class TasksMutations {

    @Autowired
    TaskPublisher taskPublisher;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;

    @SchemaMapping(typeName = "Mutation", field = "createTask")
    public Task createTask(
            @Argument String title,
            @Argument String description,
            @Argument String deadline,
            @Argument Number status,
            @Argument List<String> assignedToIds,
            @Argument String roomOwnerId) {
        try {
            Room room = roomRepository.findById(roomOwnerId).orElseThrow(null);
            AtomicReference<String> taskIdRef = new AtomicReference<>(generateRandomId());
            boolean isUnique = room.getTasks().stream().noneMatch(t -> t.getId().equals(taskIdRef.get()));

            while (!isUnique) {
                taskIdRef.set(generateRandomId());
                isUnique = room.getTasks().stream().noneMatch(t -> t.getId().equals(taskIdRef.get()));
            }

            Task task = new Task();
            task.setId(taskIdRef.get());
            task.setTitle(title);
            task.setDescription(description);
            if (deadline != null) {
                task.setDeadline(deadline);
            }
            if (status != null) {
                task.setStatus(status);
            }
            if (assignedToIds != null) {
                List<Member> assignedTo = new ArrayList<>();
                for (String assignedToId : assignedToIds) {
                    User user = userRepository.findById(assignedToId).orElseThrow(null);
                    System.out.println(user.getEmail());
                    Member member = new Member(user, "");
                    assignedTo.add(member);
                }
                task.setAssignedTo(assignedTo);
            }
            task.setCreatedAt(new Date().toString());
            task.setUpdatedAt(new Date().toString());

            room.addTask(task);
            roomRepository.save(room);
            taskPublisher.publishTask(task, room.getId(), "create");
            return task;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    private String generateRandomId() {
        return UUID.randomUUID().toString();
    }

    @SchemaMapping(typeName = "Mutation", field = "deleteTask")
    public Task deleteTask(@Argument String taskId, @Argument String roomId) {
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(null);
            Task task = room.getTaskById(taskId);
            taskPublisher.publishTask(task, room.getId(), "delete");
            room.deleteTask(taskId);
            roomRepository.save(room);
            return task;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @SchemaMapping(typeName = "Mutation", field = "editTask")
    public Task editTask(
            @Argument String taskId,
            @Argument String title,
            @Argument String description,
            @Argument String deadline,
            @Argument Number status,
            @Argument List<String> assignedToIds,
            @Argument String roomId) {
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(null);
            Task task = room.getTaskById(taskId);

            if (title != null) {
                task.setTitle(title);
            }
            if (description != null) {
                task.setDescription(description);
            }
            if (deadline != null) {
                task.setDeadline(deadline);
            }
            if (status != null) {
                task.setStatus(status);
            }
            if (assignedToIds != null) {
                List<Member> assignedTo = new ArrayList<>();
                // Verificamos la cantidad de ids que se pasaron, si son 0, entonces se borran
                // todos los miembros
                if (assignedToIds.size() == 0) {
                    task.setAssignedTo(assignedTo);
                    roomRepository.save(room);
                    return task;
                } else {
                    for (String assignedToId : assignedToIds) {

                        // Obtener el usuario correspondiente al userOwner
                        User user = userRepository.findById(assignedToId).orElseThrow(null);
                        // Crear el miembro
                        System.out.println(user.getEmail());
                        Member member = new Member(user, "");

                        assignedTo.add(member);
                    }
                }
                task.setAssignedTo(assignedTo);
            }
            task.setUpdatedAt(new Date().toString());
            roomRepository.save(room);
            taskPublisher.publishTask(task, room.getId(), "edit");
            return task;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}