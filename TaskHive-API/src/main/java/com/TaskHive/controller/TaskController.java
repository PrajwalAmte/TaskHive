package com.TaskHive.controller;

import com.TaskHive.models.Task;
import com.TaskHive.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        taskService.createTask(
            task.getTitle(),
            task.getDescription(),
            task.getDueDate().toString(),
            task.getPriority(),
            task.getCategory(),
            task.getReminder() != null ? task.getReminder().toString() : null
        );
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<Void> toggleTask(@PathVariable Long id) {
        taskService.toggleTask(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<Task> searchTasks(@RequestParam String query) {
        return taskService.searchTasks(query);
    }

    @GetMapping("/priority/{priority}")
    public List<Task> getTasksByPriority(@PathVariable String priority) {
        return taskService.getTasksByPriority(priority);
    }

    @GetMapping("/category/{category}")
    public List<Task> getTasksByCategory(@PathVariable String category) {
        return taskService.getTasksByCategory(category);
    }

    @GetMapping("/due-date/{dueDate}")
    public List<Task> getTasksByDueDate(@PathVariable String dueDate) {
        return taskService.getTasksByDueDate(LocalDate.parse(dueDate));
    }

    @GetMapping("/upcoming")
    public List<Task> getUpcomingTasks() {
        return taskService.getUpcomingTasks();
    }
}
