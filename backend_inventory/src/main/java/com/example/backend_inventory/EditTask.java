package com.example.backend_inventory;

import java.time.Duration;
import java.util.List;

public class EditTask {
    private Duration PromedioHig;
    private Duration PromedioMid;
    private Duration PromedioLow;
    public EditTask(List<MostrarDatos> Datos,int id,MostrarDatos Edit,
                    Duration AvaTimeHig,Duration AvaTimeMid,Duration AvaTimeLow){
        Datos.stream()
        .filter(d->d.getId()==id)
        .findFirst()
        .ifPresent(d->{
            d.setName(Edit.getName());
            d.setFechaARealizar(Edit.getFechaARealizar());
            d.setPriority(Edit.getPriority());
        });
    }
    public Duration[] Edit_Prom(){
        return new Duration[]{PromedioHig,PromedioMid,PromedioLow};
    }
}
