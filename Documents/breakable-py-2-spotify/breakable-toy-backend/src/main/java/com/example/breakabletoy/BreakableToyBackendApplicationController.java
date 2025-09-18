package com.example.breakabletoy;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.bind.annotation.GetMapping;


@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class BreakableToyBackendApplicationController {
	@Autowired
	private BreakableToyBackendApplicationService spotifyService;

	public static void main(String[] args) {
		SpringApplication.run(BreakableToyBackendApplicationController.class, args);
	}

	@PostMapping("/auth/spotify")
	public String gettingAnUserLogged(){
		return spotifyService.preparingAuth();
	}

	@GetMapping("/loggedin")
	public RedirectView recivingSpotifyCode(@RequestParam String code, @RequestParam String state) {
		spotifyService.gettingSpotifyCode(code);
		
		return new RedirectView("http://127.0.0.1:3000");
	}

	@GetMapping("/me/top/artists")
	public String sendingTopArtist() throws IOException, InterruptedException{
		return spotifyService.askingForTopArtists();
	}
	
	

}
