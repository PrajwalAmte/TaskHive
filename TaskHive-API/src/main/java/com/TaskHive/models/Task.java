package com.TaskHive.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDate dueDate;
    private String priority; // HIGH, MEDIUM, LOW
    private String category;
    private LocalDateTime reminder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

