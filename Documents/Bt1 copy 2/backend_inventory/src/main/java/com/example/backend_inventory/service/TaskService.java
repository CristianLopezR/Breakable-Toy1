package com.example.backend_inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend_inventory.Task;
import com.example.backend_inventory.repository.TaskRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.Duration;

@Service
public class TaskService {
    @Autowired
    public TaskRepository taskRepository;

    public List<String> getAvaTime(){
        Duration [] avaTimes = taskRepository.getAvaTime();
        int [] tasksDone = taskRepository.getTasksDone();
        List<String> avgTimeList = new ArrayList<>();
        for(int i=0;i<avaTimes.length;i++){
            avgTimeList.add(conversionToHours(tasksDone[i],avaTimes[i]));
        }
        return avgTimeList;
    }

        public Map<String, Object> getCombinedTaskData(String nameFilter, String priorityFilter, String isDoneFilter, int pageNumber) {
            int pageSize = 10;

            // Obtener todas las tareas
            List<Task> allTasks = taskRepository.getTasks();
            

            // Filtrar tareas
            List<Task> filteredTasks = allTasks.stream()
                .filter(task -> nameFilter.isBlank() || task.getName().toLowerCase().contains(nameFilter.toLowerCase()))
                .filter(task -> priorityFilter.isBlank() || task.getPriority().equalsIgnoreCase(priorityFilter))
                .filter(task -> isDoneFilter.isBlank() || task.isDone() == Boolean.parseBoolean(isDoneFilter))
                .collect(java.util.stream.Collectors.toList());

            // Calcular totalPages
            int totalPages = (int) Math.ceil((double) filteredTasks.size() / pageSize);

            // Paginar
            long offset = (long) pageNumber * pageSize;
            List<Task> paginatedTasks = filteredTasks.stream()
                .skip(offset)
                .limit(pageSize)
                .collect(java.util.stream.Collectors.toList());

            // Obtener tiempos promedio
            List<String> avgTimes = getAvaTime();
            int [] completedTasks = taskRepository.getTasksDone();

            // Construir respuesta
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("tasks", paginatedTasks);
            responseData.put("avgCompletionTimes", avgTimes);
            responseData.put("totalPages", totalPages);
            responseData.put("currentPage", pageNumber);
            responseData.put("TotalTask",filteredTasks.size());
            responseData.put("TotalTaskCompleted",completedTasks);

            return responseData;
        }

    public void createTask(Task newTask){
        taskRepository.addTask(newTask);
    }

    public void editTask(Task editTask){
        taskRepository.updateTask(editTask);
    }

    public void deleteTask(int taskId){
        taskRepository.deleteTask(taskId);
    }

    public void markTaskAsDone(int taskId){
        taskRepository.markAsDone(taskId);
    }

    public void markTaskAsPending(int taskId){
        taskRepository.markAsPending(taskId);
    }

    private String conversionToHours(int tasksDone,Duration avaTime){
        if (avaTime == null || tasksDone <= 0) {
            return "No finished tasks";
        }
        long totalSegundos = avaTime.getSeconds();
        long promedioSegundos = totalSegundos / tasksDone;
        long horas = (promedioSegundos % (24 * 3600)) / 3600;
        long minutos = (promedioSegundos % 3600) / 60;
        long segundos = promedioSegundos % 60;
        return horas + ":" + minutos + ":" + segundos;
    }
}
