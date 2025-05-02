package com.TaskHive.service;

import com.TaskHive.models.Task;
import com.TaskHive.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public void createTask(String title, String description, String dueDate, String priority, String category, String reminder) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setCompleted(false);
        task.setDueDate(LocalDate.parse(dueDate));
        task.setPriority(priority);
        task.setCategory(category);
        if (reminder != null && !reminder.isEmpty()) {
            task.setReminder(LocalDateTime.parse(reminder));
        }
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public void toggleTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid task id"));
        task.setCompleted(!task.isCompleted());
        task.setUpdatedAt(LocalDateTime.now());
        taskRepository.save(task);
    }

    public List<Task> searchTasks(String query) {
        return taskRepository.findByTitleContainingOrDescriptionContaining(query, query);
    }

    public List<Task> getTasksByPriority(String priority) {
        return taskRepository.findByPriority(priority);
    }

    public List<Task> getTasksByCategory(String category) {
        return taskRepository.findByCategory(category);
    }

    public List<Task> getTasksByDueDate(LocalDate dueDate) {
        return taskRepository.findByDueDate(dueDate);
    }

    public List<Task> getUpcomingTasks() {
        return taskRepository.findByDueDateGreaterThanEqual(LocalDate.now());
    }
}
