package com.example.backend_inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class BackendInventoryApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendInventoryApplication.class, args);
	}

}