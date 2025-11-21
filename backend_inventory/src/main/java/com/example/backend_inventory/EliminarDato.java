package com.example.backend_inventory;

import java.time.Duration;
import java.util.List;

public class EliminarDato {
    private Duration AvarageTime;
    private Duration AvaTimeHigh;
    private Duration AvaTimeMid;
    private Duration AvaTimeLow;
    private int DoneHigh;
    private int DoneMid;
    private int DoneLow;
    public EliminarDato(int id, List<Task> Datos,Duration AvarageTime,Duration AvaTimeHigh,
                    Duration AvaTimeMid,Duration AvaTimeLow,int DoneH,int DoneM,int DoneL){
        Datos.stream()
        .filter(d->d.getId()==id)
        .findFirst()
        .ifPresent(d->{
            if(d.isDone()==true){
                Mark_Undone Realizado = new Mark_Undone(id-1, Datos, AvarageTime,AvaTimeHigh,AvaTimeMid,AvaTimeLow,DoneHigh,DoneMid,DoneLow);
                this.AvarageTime=Realizado.Quitar();
                this.AvaTimeHigh=Realizado.QuitarHigh();
                this.AvaTimeMid=Realizado.QuitarMid();
                this.AvaTimeLow=Realizado.QuitarLow();
                int i[]=Realizado.UnDones();
                this.DoneHigh=i[0];
                this.DoneMid=i[1];
                this.DoneLow=i[2];
            }
            Datos.remove(d);
        });
    }
    public Duration Quitar(){
        return this.AvarageTime;
    }
    public Duration QuitarHigh(){
        return AvaTimeHigh;
    }
    public Duration QuitarMid(){
        return AvaTimeMid;
    }
    public Duration QuitarLow(){
        return AvaTimeLow;
    }

    public int [] UnDones(){
        return new int[] { DoneHigh, DoneMid, DoneLow };
    }
}
