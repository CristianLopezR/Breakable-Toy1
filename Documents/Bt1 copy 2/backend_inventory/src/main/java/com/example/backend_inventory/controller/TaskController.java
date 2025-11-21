package com.example.backend_inventory.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend_inventory.Task;
import com.example.backend_inventory.service.TaskService;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService; 

    @GetMapping("all")
    @ResponseBody
    public Map<String, Object> mostrarDatos(@RequestParam String nameFilter,
                                            @RequestParam String priorityFilter,
                                            @RequestParam String isDoneFilter,
                                            @RequestParam int pageNumber) {
        return taskService.getCombinedTaskData(nameFilter, priorityFilter, isDoneFilter, pageNumber);
    }

    @PostMapping("todos")
	  public void AgregarTarea(@RequestBody Task nuevo) {
		  taskService.createTask(nuevo);
	  }

    @PostMapping("/todos/{id}/done")
    public void markAsDone(@PathVariable int id) {
      taskService.markTaskAsDone(id);
    }

    @PostMapping("/todos/{id}/pending")
    public void markAsPending(@PathVariable int id) {
      taskService.markTaskAsPending(id);
    }

    @PutMapping("todos/edit")
	  public void editTask(@RequestBody Task edit){
      taskService.editTask(edit);
    }

    @DeleteMapping("todos/Del/{id}")
	  public void deleteTask(@PathVariable int id){
      taskService.deleteTask(id);
    }
}
