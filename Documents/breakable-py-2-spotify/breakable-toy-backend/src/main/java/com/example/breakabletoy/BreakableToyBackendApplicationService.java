package com.example.breakabletoy;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class BreakableToyBackendApplicationService {
    @Autowired
    private BreakableToyBackendApplicationRepository spotifyRepository;
    private String redirectUri = "http://127.0.0.1:8080/loggedin";

    public String preparingAuth(){
        var state = generateRandomString(16);
        String scope = "user-read-private user-read-email user-read-playback-state user-top-read";    
        return spotifyRepository.gettingTokens(state, scope, redirectUri).getUrl();
    }

    private String generateRandomString(int length) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] bytes = new byte[length];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes).substring(0, length);
    }

    public void gettingSpotifyCode(String code){
        spotifyRepository.storingSpotifyCode(code,redirectUri);
    }

    public String askingForTopArtists() throws IOException, InterruptedException{
        return spotifyRepository.gettingTopArtist();
    }
}
