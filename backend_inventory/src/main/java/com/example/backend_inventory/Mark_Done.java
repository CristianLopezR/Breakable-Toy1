package com.example.backend_inventory;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

public class Mark_Done {
    private Duration Promedio;
    public Mark_Done(int id,List<MostrarDatos> Datos,Duration AvaTime){
        Duration AuxDuration = AvaTime;
        ObtenerPromedio obtenerPromedio = new ObtenerPromedio();
        Datos.stream()
        .filter(d -> d.getId() == id)
        .findFirst()
        .ifPresent(d -> {
         d.setBool(true);
         d.setdoneDate(LocalDateTime.now());
         this.Promedio=obtenerPromedio.Promedio(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AuxDuration,Datos.size());
     });
    }
    public Duration Prom(){
        return Promedio;
    }
}
