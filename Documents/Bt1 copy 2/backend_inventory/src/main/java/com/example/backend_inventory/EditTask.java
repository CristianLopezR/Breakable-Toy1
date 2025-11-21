package com.example.backend_inventory;

import java.time.Duration;
import java.util.List;

public class EditTask {
    private Duration PromedioHig;
    private Duration PromedioMid;
    private Duration PromedioLow;
    public EditTask(List<Task> Datos,int id,Task Edit,
                    Duration AvaTimeHig,Duration AvaTimeMid,Duration AvaTimeLow){
        Datos.stream()
        .filter(d->d.getId()==id)
        .findFirst()
        .ifPresent(d->{
            d.setName(Edit.getName());
            d.setDueDate(Edit.getDueDate());
            d.setPriority(Edit.getPriority());
        });
    }
    public Duration[] Edit_Prom(){
        return new Duration[]{PromedioHig,PromedioMid,PromedioLow};
    }
}
