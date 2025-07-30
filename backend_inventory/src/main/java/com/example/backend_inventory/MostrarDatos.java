package com.example.backend_inventory;

import java.time.LocalDateTime;
import java.util.Objects;

public class MostrarDatos {
    private Integer id;
    private String name;
    private String fechaARealizar;
    private Boolean check;
    private LocalDateTime doneDate;
    private String priority;
    private LocalDateTime creation;
    
    public MostrarDatos(Integer id,String name,String fechaARealizar,Boolean check,String priority){
        this.id=id;
        this.name=name;
        this.fechaARealizar=fechaARealizar;
        this.check=check;
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
    public String getFechaARealizar(){return fechaARealizar;}
    public void setFechaARealizar(String fechaARealizar){this.fechaARealizar=fechaARealizar;}
    //Retorno Realizado o no
    public Boolean getBool(){return check;}
    public void setBool(Boolean check){this.check=check;}
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
        MostrarDatos that = (MostrarDatos) o;
        return Objects.equals(name, that.name);
    }
    //Verifica que el Id sea diferente
    @Override
    public int hashCode(){
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return name + " " + priority + " " + fechaARealizar +" "+ check+" "+ creation + " " + doneDate + " " + id;
    }
}
