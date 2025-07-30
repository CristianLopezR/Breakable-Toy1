package com.example.backend_inventory;

import java.util.List;

public class EliminarDato {
    public EliminarDato(int id, List<MostrarDatos> Datos){
        Datos.stream()
        .filter(d->d.getId()==id)
        .findFirst()
        .ifPresent(d->{
            Datos.remove(d);
        });
    }
}
