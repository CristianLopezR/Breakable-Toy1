package com.example.backend_inventory;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class BackendInventoryApplication {
	private List<MostrarDatos> Datos = new ArrayList<>();
	private int id=0;
	private Duration AvarageTime = Duration.ofDays(0);
	public static void main(String[] args) {
		SpringApplication.run(BackendInventoryApplication.class, args);
	}

	@GetMapping("/todos")
    public List<MostrarDatos> MostrarDatos(){
		Filtros A=new Filtros();
		A.Prioridad(Datos, "Alta");
        return List.copyOf(Datos);
    }

	@PostMapping("/todos/{id}/done")
    public void Check(@PathVariable int id) {
		Mark_Done Realizado = new Mark_Done(id,Datos,AvarageTime);
		AvarageTime=Realizado.Prom();
		System.out.println(AvarageTime.toSeconds());
    }

	@PostMapping("todos")
	public void AgregarTarea(@RequestBody MostrarDatos nuevo) {
		new CrearDatos(Datos,nuevo, id);
		id++;
	}
	
	@PutMapping("todos/{id}/undone")
	public void putMethodName(@PathVariable int id) {
		new Mark_Undone(id, Datos);
	}

	@PutMapping("todos/edit/{id}")
	public void putMethodEdit(@PathVariable int id,@RequestBody MostrarDatos edit) {
		new EditTask(Datos, id, edit);
	}

	@DeleteMapping("todos/Del/{id}")
	public void deleteMethodName(@PathVariable int id){
		new EliminarDato(id, Datos);
		id--;
	}

}
