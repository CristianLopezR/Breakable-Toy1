package com.example.backend_inventory.repository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

import com.example.backend_inventory.Task;

@Repository
public class TaskRepository {
	private List<Task> tasks = new ArrayList<>();
    private int id=0;
    private Duration avaTime = Duration.ofDays(0);
    private int tasksDone = 0;

    private Duration avaTimeHigh = Duration.ofDays(0);
    private int hightasksDone = 0;

    private Duration avaTimeMed = Duration.ofDays(0);
    private int medtasksDone = 0;
    
    private Duration avaTimeLow = Duration.ofDays(0);
    private int lowtasksDone = 0;

    public void addTask(Task newtask){
        boolean existe = false;
        for (Task dato : tasks) {
        if (dato.equals(newtask)) {
            existe = true;
            break;
        }
        }
        if (!existe) {
            newtask.setId(id);
            newtask.setDone(false);
            tasks.addFirst(newtask);
            id++;
        }
    }

    public void updateTask(Task task){
        tasks.stream()
        .filter(d->d.getId()==task.getId())
        .findFirst()
        .ifPresent(d->{
            d.setName(task.getName());
            d.setDueDate(task.getDueDate());
            d.setPriority(task.getPriority());
            System.out.println(task.getPriority());
        });
    }

    public void deleteTask(int taskId){
        markAsPending(taskId);
        tasks.removeIf(t -> t.getId() == taskId);
    }

    public List<Task> getTasks(){
        return tasks;
    }

    public Duration [] getAvaTime(){
        return new Duration [] {avaTime,avaTimeHigh,avaTimeMed,avaTimeLow};
    }

    public int [] getTasksDone(){
        return new int[] {tasksDone,hightasksDone,medtasksDone,lowtasksDone};
    }

    public void markAsDone(int taskId){
        tasks.stream()
        .filter(d->d.getId()==taskId)
        .findFirst()
        .ifPresent(d->{
            d.setDone(true);
            Duration timeTaken = Duration.between(d.getcreationDatePromedio(),LocalDateTime.now());
            avaTime = (avaTime == null)? timeTaken : avaTime.plus(timeTaken);
            tasksDone+=1;
            if(d.getPriority().equals("High")){
                hightasksDone+=1;
                avaTimeHigh = (avaTimeHigh == null)? timeTaken : avaTimeHigh.plus(timeTaken);
            }

            if(d.getPriority().equals("Medium")){
                medtasksDone+=1;
                avaTimeMed = (avaTimeMed == null)? null : avaTimeMed.plus(timeTaken);
            }

            if(d.getPriority().equals("Low")){
                lowtasksDone+=1;
                avaTimeLow = (avaTimeLow == null)? null : avaTimeLow.plus(timeTaken);
            }
        });
    }

    public void markAsPending(int taskId){
        tasks.stream()
        .filter(d->d.getId()==taskId)
        .findFirst()
        .ifPresent(d->{
            d.setDone(false);
            Duration timeTaken = Duration.between(d.getcreationDatePromedio(),LocalDateTime.now());
            tasksDone-=1;
            avaTime = (avaTime == null)? null : avaTime.minus(timeTaken);

            if(d.getPriority().equals("High")){
                hightasksDone-=1;
                avaTimeHigh = (avaTimeHigh == null)? null : avaTimeHigh.minus(timeTaken);
            }

            if(d.getPriority().equals("Medium")){
                lowtasksDone-=1;
                avaTimeLow = (avaTimeLow == null)? null : avaTimeLow.minus(timeTaken);
            }

            if(d.getPriority().equals("Low")){
                lowtasksDone-=1;
                avaTimeLow = (avaTimeLow == null)? null : avaTimeLow.minus(timeTaken);
            }

            d.setDone(false);
            d.setdoneDate(null);
        });
    }


}
