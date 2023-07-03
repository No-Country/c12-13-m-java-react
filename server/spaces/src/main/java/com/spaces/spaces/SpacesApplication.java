package com.spaces.spaces;

import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableMongoAuditing
@SpringBootApplication
public class SpacesApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpacesApplication.class, args);
		System.out.println("Ok");
	}

}
