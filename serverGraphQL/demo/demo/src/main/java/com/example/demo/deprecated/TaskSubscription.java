// package com.example.demo.resolver;

// import com.example.demo.model.Task;
// import com.example.demo.model.Room;

// import com.example.demo.repository.RoomRepository;

// import com.example.demo.resolver.TaskPublisher;
// import org.reactivestreams.Publisher;
// import org.springframework.graphql.data.method.annotation.Argument;
// import org.springframework.graphql.data.method.annotation.MutationMapping;
// import org.springframework.graphql.data.method.annotation.QueryMapping;
// import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
// import org.springframework.stereotype.Controller;
// import reactor.core.publisher.ConnectableFlux;
// import reactor.core.publisher.Flux;
// import reactor.core.publisher.FluxSink;

// import org.springframework.beans.factory.annotation.Autowired;

// import java.util.List;
// import javax.annotation.PostConstruct;

// @Controller
// public class TaskSubscription {

//     // private FluxSink<Task> carStream;
//     // private ConnectableFlux<Task> carPublisher;
 
//     @Autowired
//     TaskPublisher taskPublisher;
//     @Autowired
//     private RoomRepository roomRepository;
//     @Autowired


//     @PostConstruct
//     public void init() {

//         Flux<Task> publisher = Flux.create(emitter -> {
//             carStream = emitter;
//         });
//         carPublisher = publisher.publish();
//         carPublisher.connect();
//     }

//     @QueryMapping
//     public List<Car> getParkedCars() {
//         return CarParkService.getInstance().getParkedCars();
//     }

//     @MutationMapping
//     public Car parkCar(@Argument String id, @Argument String vehicleNumber, @Argument String vehicleType) {
//         Car car = new Car(id, vehicleNumber, vehicleType);
//         carStream.next(car);
//         return CarParkService.getInstance().parkCar(car);

//     }

//     @SubscriptionMapping
//     public Publisher<Task> notifyTaskChange() {
//         return taskPublisher.getPublisher();
//     }
// }
