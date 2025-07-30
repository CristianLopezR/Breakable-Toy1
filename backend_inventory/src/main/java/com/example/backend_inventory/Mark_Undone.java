package com.example.backend_inventory;
import java.util.List;

public class Mark_Undone {
        public Mark_Undone(int id,List<MostrarDatos> Datos){
            Datos.stream()
            .filter(d -> d.getId() == id)
            .findFirst()
            .ifPresent(d -> {
            d.setBool(false);
            d.setdoneDate(null);
     });
    }
}
