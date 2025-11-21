package com.example.backend_inventory;

import java.time.LocalDateTime;
import java.util.Objects;

public class Task {
    private Integer id;
    private String name;
    private String dueDate;
    private Boolean done;
    private LocalDateTime doneDate;
    private String priority;
    private LocalDateTime creation;
    
    public Task(Integer id,String name,String fechaARealizar,Boolean check,String priority){
        this.id=id;
        this.name=name;
        this.dueDate=fechaARealizar;
        this.done=check;
        this.priority=priority;
        this.creation=LocalDateTime.now();
        this.doneDate=null;
    }
    //retorno Id
    public Integer getId(){return id;}
    public void setId(Integer id){this.id=id;}
    //Retorno Nombre de la tarea
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    //Retorno Fecha a realizar
    public String getDueDate(){return dueDate;}
    public void setDueDate(String fechaARealizar){this.dueDate=fechaARealizar;}
    //Retorno Realizado o no
    public Boolean isDone(){return done;}
    public void setDone(Boolean done){this.done=done;}
    //Retorno prioridad
    public String getPriority(){return priority;}
    public void setPriority(String priority){this.priority=priority;}
    //Darle valor a Fecha Realizada cuando se marque el check
    public void setdoneDate(LocalDateTime FechaFinalzacion){this.doneDate=FechaFinalzacion;}
    public String getdoneDate(){return (doneDate != null) ? doneDate.toString() : null;}
    public LocalDateTime getdoneDatePromedio(){return doneDate;}

    public String getCreationDate(){return creation.toString();}
    public LocalDateTime getcreationDatePromedio(){return creation;}
    
    //Verifica si el Id ya existe en la lista
    @Override
    public boolean equals(Object o){
        if(o==null || getClass()!=o.getClass()) return false;
        Task that = (Task) o;
        return Objects.equals(id, that.id);
    }
    //Verifica que el Id sea diferente
    @Override
    public int hashCode(){
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return name + " " + priority + " " + dueDate +" "+ done + " "+ creation + " " + doneDate + " " + id;
    }
}
