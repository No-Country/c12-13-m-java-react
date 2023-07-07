package com.example.demo.model;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.NonNull;

@Document(collection = "rooms")
public class Room {
    @Id
    private String id;
    @Builder.Default
    private String name = "NameLess Room";
    @Builder.Default
    private String description = "";
    @Builder.Default
    private String coverImage = "";
    @DBRef
    private Space spaceOwner;
    // @DBRef
    // private List<Task> tasks = new ArrayList<>();
    private String createdAt;
    private String updatedAt;

    public Room() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public Room(String name, String description, String coverImage, String createdAt, String updatedAt) {
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.coverImage = coverImage;
    }

    // ---------------------------------------------------------------------------------------------
    // Getters
    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public String getCoverImage() {
        return this.coverImage;
    }

    public Space getSpaceOwner() {
        return this.spaceOwner;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }


    // ---------------------------------------------------------------------------------------------
    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public void setSpaceOwner(Space spaceOwner) {
        this.spaceOwner = spaceOwner;
    }

    public void addTask(Member member) {
        // this.members.add(member);
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Room [id=" + id + ", name=" + name + ", description=" + description + ", coverImage=" + coverImage
                + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }

}