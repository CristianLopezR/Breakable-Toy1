package com.example.backend_inventory;

import java.util.List;
import java.util.stream.Collectors;

public class Filtros {
    private List<MostrarDatos> Aux;
    public List<MostrarDatos> Nombre(List<MostrarDatos> Data, String A){
        this.Aux=Data.stream().
        filter(d->d.getName().contains(A)).
        collect(Collectors.toList());
        return Aux;
    }

    public List<MostrarDatos> Prioridad(List<MostrarDatos> Data,String Prio){
        this.Aux=Data.stream().
        filter(d->d.getPriority().contains(Prio)).
        collect(Collectors.toList());
        return Aux;
    }

    public List<MostrarDatos> Done(List<MostrarDatos> Data,boolean Check){
        this.Aux=Data.stream().
        filter(d->d.getBool() == Check).
        collect(Collectors.toList());
        return Aux;
    }

    public List<MostrarDatos> UnDone(List<MostrarDatos> Data,boolean Check){
        this.Aux=Data.stream().
        filter(d->d.getBool() == Check).
        collect(Collectors.toList());
        return Aux;
    }
}
