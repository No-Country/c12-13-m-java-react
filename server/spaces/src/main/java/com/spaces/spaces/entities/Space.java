package com.spaces.spaces.entities;

public class Space {
    private int id;
    private String name;
    private String description;
    private String coverImage;
    private User members ;
    private Boolean lastModified;
    private Boolean createdAt;



    public Space(String name) {
        this.name = name;
    }





    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public Boolean getLastModified() {
        return lastModified;
    }

    public void setLastModified(Boolean lastModified) {
        this.lastModified = lastModified;
    }

    public Boolean getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Boolean createdAt) {
        this.createdAt = createdAt;
    }


}


