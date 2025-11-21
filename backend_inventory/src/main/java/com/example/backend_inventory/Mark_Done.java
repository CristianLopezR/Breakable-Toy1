package com.example.backend_inventory;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

public class Mark_Done {
    private Duration Promedio;
    private Duration PromedioHig;
    private Duration PromedioMid;
    private Duration PromedioLow;
    private int DoneHigh;
    private int DoneMid;
    private int DoneLow;
    public Mark_Done(int id,List<Task> Datos,
                    Duration AvaTime,Duration AvaTimeHig,
                    Duration AvaTimeMid,Duration AvaTimeLow,
                    int DoneH,int DoneM,int DoneL){

        Duration AuxDuration = AvaTime;
        ObtenerPromedio obtenerPromedio = new ObtenerPromedio();
        LocalDateTime TiempoFinish = LocalDateTime.now();
        Datos.stream()
        .filter(d -> d.getId() == id)
        .findFirst()
        .ifPresent(d -> {
            d.setDone(true);
            d.setdoneDate(TiempoFinish);
            this.Promedio=obtenerPromedio.Promedio(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AuxDuration);
            this.PromedioHig=(d.getPriority().equals("Alta"))?obtenerPromedio.Promedio(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AvaTimeHig):AvaTimeHig;
            this.PromedioMid=(d.getPriority().equals("Media"))?obtenerPromedio.Promedio(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AvaTimeMid):AvaTimeMid;
            this.PromedioLow=(d.getPriority().equals("Baja"))?obtenerPromedio.Promedio(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AvaTimeLow):AvaTimeLow;
            this.DoneHigh=(d.getPriority().equals("Alta"))?DoneH+1:DoneH;
            this.DoneMid=(d.getPriority().equals("Media"))?DoneM+1:DoneM;
            this.DoneLow=(d.getPriority().equals("Baja"))?DoneL+1:DoneL;
        });
    }
    public Duration Prom(){
        return Promedio;
    }
    public Duration PromHigh(){
        return PromedioHig;
    }
    public Duration PromedioMid(){
        return PromedioMid;
    }
    public Duration PromedioLow(){
        return PromedioLow;
    }

    public int [] Dones(){
        return new int[] { DoneHigh, DoneMid, DoneLow };
    }
}
