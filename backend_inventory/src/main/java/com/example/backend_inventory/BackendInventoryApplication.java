package com.example.backend_inventory;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;



@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class BackendInventoryApplication {
	private List<MostrarDatos> Datos = new ArrayList<>();
	private int id=0;
	private int Done=0;
	private int DoneHigh=0;
	private int DoneMid=0;
	private int DoneLow=0;
	private Duration AvarageTime = Duration.ofDays(0);
	private Duration AvarageTimeHigh = Duration.ofDays(0);
	private Duration AvarageTimeMid = Duration.ofDays(0);
	private Duration AvarageTimeLow = Duration.ofDays(0);


	public static void main(String[] args) {
		SpringApplication.run(BackendInventoryApplication.class, args);
	}

	@GetMapping("/todos")
    public ResponseEntity<Filtros> MostrarDatos(@RequestParam int page,@RequestParam String nam,@RequestParam String prio,@RequestParam String DoneUn){
		Filtros A=new Filtros(1,Datos,"a","b","c","d");
		List<MostrarDatos> Aux=Datos;
		Aux=(nam=="")?Datos:A.Nombre(Aux,nam);
		Aux=(prio.equals("All"))?Aux:A.Prioridad(Aux,prio);
		Aux=(DoneUn.equals("All"))?Aux:A.Done(Aux,DoneUn);
		Filtros respuesta =A.Paginacion(Aux,page,AvarageTime,Done,AvarageTimeHigh,AvarageTimeMid,AvarageTimeLow,DoneHigh,DoneMid,DoneLow);
		return ResponseEntity.ok().body(respuesta);
    }

	@PostMapping("/todos/{id}/done")
    public void Check(@PathVariable int id) {
		Done++;
		Mark_Done Realizado = new Mark_Done(id,Datos,AvarageTime,AvarageTimeHigh,AvarageTimeMid,AvarageTimeLow,DoneHigh,DoneMid,DoneLow);
		AvarageTime=Realizado.Prom();
		AvarageTimeHigh=Realizado.PromHigh();
		AvarageTimeMid=Realizado.PromedioMid();
		AvarageTimeLow=Realizado.PromedioLow();
		int i[]=Realizado.Dones();
		DoneHigh=i[0];
		DoneMid=i[1];
		DoneLow=i[2];
    }

	@PostMapping("todos")
	public void AgregarTarea(@RequestBody MostrarDatos nuevo) {
		new CrearDatos(Datos,nuevo, id);
		id++;
	}
	
	@PutMapping("todos/{id}/undone")
	public void putMethodName(@PathVariable int id) {
		Done--;
		Mark_Undone Realizado = new Mark_Undone(id, Datos, AvarageTime,AvarageTimeHigh,AvarageTimeMid,AvarageTimeLow,DoneHigh,DoneMid,DoneLow);
		AvarageTime=Realizado.Quitar();
		AvarageTimeHigh=Realizado.QuitarHigh();
		AvarageTimeMid=Realizado.QuitarMid();
		AvarageTimeLow=Realizado.QuitarLow();
		int i[]=Realizado.UnDones();
		DoneHigh=i[0];
		DoneMid=i[1];
		DoneLow=i[2];
	}

	@PutMapping("todos/edit/{id}")
	public void putMethodEdit(@PathVariable int id,@RequestBody MostrarDatos edit) {
		new EditTask(Datos, id, edit,AvarageTimeHigh,AvarageTimeMid,AvarageTimeLow);
	}

	@DeleteMapping("todos/Del/{id}")
	public void deleteMethodName(@PathVariable int id){
		EliminarDato Realizado=new EliminarDato(id, Datos,AvarageTime,AvarageTimeHigh,AvarageTimeMid,AvarageTimeLow,DoneHigh,DoneMid,DoneLow);
		AvarageTime=Realizado.Quitar();
		AvarageTimeHigh=Realizado.QuitarHigh();
		AvarageTimeMid=Realizado.QuitarMid();
		AvarageTimeLow=Realizado.QuitarLow();
		int i[]=Realizado.UnDones();
		DoneHigh=i[0];
		DoneMid=i[1];
		DoneLow=i[2];
		id--;
		Done--;
	}

}
