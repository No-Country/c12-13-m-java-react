// // package com.example.demo.resolver;

// // import java.util.Map;
// // import java.util.concurrent.ConcurrentHashMap;

// // import javax.annotation.PostConstruct;

// // import com.example.demo.model.Task;

// // import reactor.core.publisher.ConnectableFlux;
// // import reactor.core.publisher.Flux;
// // import reactor.core.publisher.FluxSink;

// // import org.springframework.stereotype.Component;

// // @Component
// // public class TaskPublisher {

// //     private Map<String, FluxSink<Task>> taskStreams = new ConcurrentHashMap<>();
// //     private Map<String, ConnectableFlux<Task>> taskPublishers = new ConcurrentHashMap<>();

// //     public void publishTask(Task task, String roomId) {
// //         FluxSink<Task> taskStream = taskStreams.get(roomId);
// //         if (taskStream != null) {
// //             taskStream.next(task);
// //         }
// //     }

// //     public Flux<Task> getTaskStream(String roomId) {
// //         ConnectableFlux<Task> taskPublisher = taskPublishers.computeIfAbsent(roomId, key -> createTaskPublisher(roomId));
// //         return taskPublisher.autoConnect();
// //     }

// //     private ConnectableFlux<Task> createTaskPublisher(String roomId) {
// //         return Flux.<Task>create(sink -> {
// //             taskStreams.put(roomId, sink);
// //         }).publish();
// //     }
// // }

// package com.example.demo.resolver;

// import java.util.Map;
// import java.util.concurrent.ConcurrentHashMap;

// import javax.annotation.PostConstruct;

// import com.example.demo.model.Task;

// import reactor.core.publisher.ConnectableFlux;
// import reactor.core.publisher.Flux;
// import reactor.core.publisher.FluxSink;

// import org.springframework.stereotype.Component;

// @Component
// public class TaskPublisher {

//     private Map<String, FluxSink<Task>> newTaskStreams = new ConcurrentHashMap<>();
//     private Map<String, FluxSink<Task>> modifiedTaskStreams = new ConcurrentHashMap<>();
//     private Map<String, ConnectableFlux<Task>> taskPublishers = new ConcurrentHashMap<>();

//     // Publisher handler for new tasks
//     public void publishNewTask(Task task, String roomId, String action) {
//         publishNewTask(task, roomId);
//     }

//     // Publisher handler for edited tasks
//     public void publishEditedTask(Task task, String roomId, String action) {
//         publishModifiedTask(task, roomId);
//     }

//     // ConnectableFlux for new tasks
//     private ConnectableFlux<Task> createNewTaskPublisher(String roomId) {
//         return Flux.<Task>create(sink -> {
//             newTaskStreams.put(roomId, sink);
//         }).publish();
//     }

//     // ConnectableFlux for edited tasks
//     private ConnectableFlux<Task> createModifiedTaskPublisher(String roomId) {
//         return Flux.<Task>create(sink -> {
//             modifiedTaskStreams.put(roomId, sink);
//         }).publish();
//     }

//     // Getter for new tasks
//     public Flux<Task> getNewTaskStream(String roomId) {
//         ConnectableFlux<Task> taskPublisher = taskPublishers.computeIfAbsent(roomId,
//                 key -> createNewTaskPublisher(roomId));
//         return taskPublisher.autoConnect();
//     }

//     // Getter for edited tasks
//     public Flux<Task> getModifiedTaskStream(String roomId) {
//         ConnectableFlux<Task> taskPublisher = taskPublishers.computeIfAbsent(roomId,
//                 key -> createModifiedTaskPublisher(roomId));
//         return taskPublisher.autoConnect();
//     }

//     // Publish new tasks
//     private void publishNewTask(Task task, String roomId) {
//         FluxSink<Task> taskStream = newTaskStreams.get(roomId);
//         System.out.println("publishNewTask: " + taskStream);
//         if (taskStream != null) {
//             taskStream.next(task);
//         }
//     }

//     // Publish edited tasks
//     private void publishModifiedTask(Task task, String roomId) {
//         FluxSink<Task> taskStream = modifiedTaskStreams.get(roomId);
//         System.out.println("publishModifiedTask: " + taskStream + roomId);
//         if (taskStream != null) {
//             taskStream.next(task);
//         }
//     }

// }

package com.example.demo.resolver;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.example.demo.model.Task;

import reactor.core.publisher.ConnectableFlux;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import org.springframework.stereotype.Component;

@Component
public class TaskPublisher {

    private Map<String, FluxSink<Task>> createTaskStreams = new ConcurrentHashMap<>();
    private Map<String, FluxSink<Task>> editTaskStreams = new ConcurrentHashMap<>();
    private Map<String, ConnectableFlux<Task>> createTaskPublishers = new HashMap<>();
    private Map<String, ConnectableFlux<Task>> editTaskPublishers = new HashMap<>();

    public void publishTask(Task task, String roomId, String action) {
        if (action.equals("create")) {
            publishNewTask(task, roomId);
        } else if (action.equals("edit")) {
            publishModifiedTask(task, roomId);
        }
    }

    // Publisher handler for new tasks
    public void publishNewTask(Task task, String roomId) {
        FluxSink<Task> taskStream = createTaskStreams.get(roomId);
        if (taskStream != null) {
            taskStream.next(task);
        }
    }

    // Publisher handler for edited tasks
    public void publishModifiedTask(Task task, String roomId) {
        FluxSink<Task> taskStream = editTaskStreams.get(roomId);
        if (taskStream != null) {
            taskStream.next(task);
        }
    }

    private ConnectableFlux<Task> createCreateTaskPublisher(String roomId) {
        return Flux.<Task>create(sink -> {
            createTaskStreams.put(roomId, sink);
        }).publish();
    }

    private ConnectableFlux<Task> createEditTaskPublisher(String roomId) {
        return Flux.<Task>create(sink -> {
            editTaskStreams.put(roomId, sink);
        }).publish();
    }

    public Flux<Task> getCreateTaskStream(String roomId) {
        ConnectableFlux<Task> taskPublisher = createTaskPublishers.computeIfAbsent(roomId,
                key -> createCreateTaskPublisher(roomId));
        return taskPublisher.autoConnect();
    }

    public Flux<Task> getEditTaskStream(String roomId) {
        ConnectableFlux<Task> taskPublisher = editTaskPublishers.computeIfAbsent(roomId,
                key -> createEditTaskPublisher(roomId));
        return taskPublisher.autoConnect();
    }

}
