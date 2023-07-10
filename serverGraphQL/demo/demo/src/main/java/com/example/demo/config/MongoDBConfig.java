package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.domain.Sort;
import javax.annotation.PostConstruct;

@Configuration
public class MongoDBConfig {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public MongoDBConfig(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

}
