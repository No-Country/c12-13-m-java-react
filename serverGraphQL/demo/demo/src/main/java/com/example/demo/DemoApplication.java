package com.example.demo;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class DemoApplication {

// 	public static void main(String[] args) {
// 		SpringApplication.run(DemoApplication.class, args);
// 	}
// 	// probame en => http://localhost:8080/graphiql
// }

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class DemoApplication {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public DemoApplication(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @PostConstruct
    public void showCollections() {
        mongoTemplate.getCollectionNames().forEach(System.out::println);
    }

    // Resto del código de la aplicación
}
