package com.example.backend_inventory;

import java.time.Duration;
import java.time.LocalDateTime;

public class ObtenerPromedio {
    public Duration Promedio(LocalDateTime A,LocalDateTime B, Duration Store,int Cantidad){
        Duration duracion = Duration.between(A, B);
        long totalSegundos = duracion.getSeconds();
        long totalsegundoAva=Store.getSeconds();
        long prom=(totalSegundos+totalsegundoAva)/Cantidad;
        Duration Prom = Duration.ofSeconds(prom);
        System.out.println(Store.toSeconds());
        return Prom;
    }
}
