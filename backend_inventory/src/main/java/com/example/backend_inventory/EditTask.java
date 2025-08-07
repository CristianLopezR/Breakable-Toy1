package com.example.backend_inventory;

import java.util.List;

public class EditTask {
    public EditTask(List<MostrarDatos> Datos,int id,MostrarDatos Edit){
        System.out.println(Edit.toString());
        Datos.stream()
        .filter(d->d.getId()==id)
        .findFirst()
        .ifPresent(d->{
            d.setName(Edit.getName());
            d.setFechaARealizar(Edit.getFechaARealizar());
            d.setPriority(Edit.getPriority());
        });
    }
}
