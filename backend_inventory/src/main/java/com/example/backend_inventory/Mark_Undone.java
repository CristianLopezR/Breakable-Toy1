package com.example.backend_inventory;
import java.time.Duration;
import java.util.List;

public class Mark_Undone {
    private Duration Promedio;
    private Duration PromedioHig;
    private Duration PromedioMid;
    private Duration PromedioLow;
    private int DoneHigh;
    private int DoneMid;
    private int DoneLow;
    public Mark_Undone(int id,List<Task> Datos,Duration AvaTime ,Duration AvaTimeHig,
                    Duration AvaTimeMid,Duration AvaTimeLow,
                    int DoneH,int DoneM,int DoneL){
        Duration AuxDuration = AvaTime;
        ObtenerPromedio obtenerPromedio = new ObtenerPromedio();
        Datos.stream()
        .filter(d -> d.getId() == id)
        .findFirst()
        .ifPresent(d -> {
            this.Promedio=obtenerPromedio.Quitar(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AuxDuration);
            this.PromedioHig=(d.getPriority().equals("Alta"))?obtenerPromedio.Quitar(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AvaTimeHig):AvaTimeHig;
            this.PromedioMid=(d.getPriority().equals("Media"))?obtenerPromedio.Quitar(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AvaTimeMid):AvaTimeMid;
            this.PromedioLow=(d.getPriority().equals("Baja"))?obtenerPromedio.Quitar(d.getcreationDatePromedio(),d.getdoneDatePromedio(),AvaTimeLow):AvaTimeLow;
            this.DoneHigh=(d.getPriority().equals("Alta"))?DoneH-1:DoneH;
            this.DoneMid=(d.getPriority().equals("Media"))?DoneM-1:DoneM;
            this.DoneLow=(d.getPriority().equals("Baja"))?DoneL-1:DoneL;
            d.setDone(false);
            d.setdoneDate(null);
     });
    }
    public Duration Quitar(){
        return this.Promedio;
    }
    public Duration QuitarHigh(){
        return PromedioHig;
    }
    public Duration QuitarMid(){
        return PromedioMid;
    }
    public Duration QuitarLow(){
        return PromedioLow;
    }

    public int [] UnDones(){
        return new int[] { DoneHigh, DoneMid, DoneLow };
    }
}
