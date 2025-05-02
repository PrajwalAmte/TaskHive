package com.TaskHive.repository;

import com.TaskHive.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTitleContainingOrDescriptionContaining(String title, String description);
    List<Task> findByPriority(String priority);
    List<Task> findByCategory(String category);
    List<Task> findByDueDate(LocalDate dueDate);
    List<Task> findByDueDateGreaterThanEqual(LocalDate dueDate);
}
