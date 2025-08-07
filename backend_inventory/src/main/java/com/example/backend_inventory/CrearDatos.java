package com.example.backend_inventory;

import java.util.List;

public class CrearDatos {
    public CrearDatos(List<MostrarDatos> Datos,MostrarDatos newtask, int id){
        boolean existe = false;
        for (MostrarDatos dato : Datos) {
        if (dato.equals(newtask)) {
            existe = true;
            break;
        }
        }
        if (!existe) {
            newtask.setId(id);
            newtask.setBool(false);
            Datos.add(newtask);
        }
    }
}
