package com.example.backend_inventory;

import java.util.List;

public class CrearDatos {
    public CrearDatos(List<Task> Datos,Task newtask, int id){
        boolean existe = false;
        for (Task dato : Datos) {
        if (dato.equals(newtask)) {
            existe = true;
            break;
        }
        }
        if (!existe) {
            newtask.setId(id);
            newtask.setDone(false);
            Datos.add(newtask);
        }
    }
}
