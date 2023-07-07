package com.example.demo.model;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class Member {
    @DBRef
    private User user;
    private String role;

    public Member() {
    }

    // ---------------------------------------------------------------------------------------------
    // Constructor
    public Member(User user, String role) {
        this.user = user;
        this.role = role;
    }

    // ---------------------------------------------------------------------------------------------
    // Getters

    // ---------------------------------------------------------------------------------------------
    // Setters


    @Override
    public String toString() {
        //return "Member [users=" + users + ", role=" + role + "]";
        return "Member [user=" + user + ", role=" + role + "]";
    }
}
