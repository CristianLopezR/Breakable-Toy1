package com.example.backend_inventory;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Filtros {
    private List<MostrarDatos> Aux;
    private int totalPaginas;
    private String Tiempo;
    private String Alt;
    private String Med;
    private String Baj;

    public Filtros(int totalPaginas,List<MostrarDatos> Data,String Tiempo
                    ,String PromedioHig,String PromedioMid,String PromedioLow){
        this.totalPaginas=totalPaginas;
        this.Aux=Data;
        this.Tiempo=Tiempo;
        this.Alt=PromedioHig;
        this.Med=PromedioMid;
        this.Baj=PromedioLow;
    }

    public List<MostrarDatos> getAux() {
        return Aux;
    }

    public int getTotalPaginas() {
        return totalPaginas;
    }

    public String getTiempo(){
        return Tiempo;
    }

    public String getAlt(){
        return Alt;
    }
    public String getMed(){
        return Med;
    }

    public String getBaj(){
        return Baj;
    }

    public List<MostrarDatos> Nombre(List<MostrarDatos> Data, String A){
        this.Aux=Data.stream().
        filter(d->d.getName().contains(A)).
        collect(Collectors.toList());
        return Aux;
    }

    public List<MostrarDatos> Prioridad(List<MostrarDatos> Data,String Prio){
        this.Aux=Data.stream().
        filter(d->d.getPriority().contains(Prio)).
        collect(Collectors.toList());
        return Aux;
    }

    public List<MostrarDatos> Done(List<MostrarDatos> Data,String Check){
        boolean auxbool;
        auxbool= (Check.equals("Done"))?true:false;
        this.Aux=Data.stream().
        filter(d->d.getBool() == auxbool).
        collect(Collectors.toList());
        return Aux;
    }

    public String Horas(int Check, Duration Tiempo) {
        if (Tiempo == null || Check <= 0) {
            return "No finished tasks";
        }
        long totalSegundos = Tiempo.getSeconds();
        long promedioSegundos = totalSegundos / Check;
        long horas = (promedioSegundos % (24 * 3600)) / 3600;
        long minutos = (promedioSegundos % 3600) / 60;
        long segundos = promedioSegundos % 60;
        return horas + ":" + minutos + ":" + segundos;
        }

    public Filtros Paginacion(List<MostrarDatos> Datos,int page,Duration Tiempo,int Check,
                                Duration TiempoHigh,Duration TiempoMid,Duration TiempoLow,
                                int TimeHigh,int TimeMid,int TimeLow){
        int pageSize = 10;
		int totalPaginas = (int) Math.ceil((double) Datos.size() / pageSize);
		int start = (page-1) * pageSize;
		int end = Math.min(start + pageSize, Datos.size());
		List<MostrarDatos> pagina = new ArrayList<>();
		pagina = (Datos != null) ? Datos.subList(start, end) : Datos;
		Filtros respuesta = new Filtros(totalPaginas, pagina,Horas(Check,Tiempo),Horas(TimeHigh,TiempoHigh),Horas(TimeMid,TiempoMid),Horas(TimeLow,TiempoLow));
        return respuesta;
    }
}
