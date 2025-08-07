package com.example.backend_inventory;

import java.time.Duration;
import java.time.LocalDateTime;

public class ObtenerPromedio {
    public Duration Promedio(LocalDateTime A,LocalDateTime B, Duration Store){
        Duration duracion = Duration.between(A, B);
        long totalSegundos = duracion.getSeconds();
        long totalsegundoAva=(Store==null)?0:Store.getSeconds();
        long prom=(totalSegundos+totalsegundoAva);
        Duration Prom = Duration.ofSeconds(prom);
        return Prom;
    }
    public Duration Quitar(LocalDateTime A,LocalDateTime B, Duration Store){
        Duration duracion = Duration.between(A, B);
        long totalSegundos = duracion.getSeconds();
        long totalsegundoAva=Store.getSeconds();
        long prom=totalsegundoAva;
        prom=(prom-totalSegundos);
        Duration Prom = Duration.ofSeconds(prom);
        return Prom;
    }
}
