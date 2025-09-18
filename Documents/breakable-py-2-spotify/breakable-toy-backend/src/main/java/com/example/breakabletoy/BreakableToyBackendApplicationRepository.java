package com.example.breakabletoy;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.Base64;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;


@Repository
public class BreakableToyBackendApplicationRepository {
    private String codeSpotify;
    private String clientId="dc95392488fe4dcca6dc2ad7e999344a";
    private String clientSecret="75c59e0432ac4f279cb0fed5ce8af5fc";
    private String accessToken;
    private String refreshToken;

    public RedirectView gettingTokens(String state,String scope,String redirectUri){
        String url = "https://accounts.spotify.com/authorize?" +
                "response_type=code" +
                "&client_id=" + clientId +
                "&scope=" + scope +
                "&redirect_uri=" + redirectUri +
                "&state=" + state;

        return new RedirectView(url);
    }

    public void storingSpotifyCode(String code,String redirectUri){
        codeSpotify=code;
        askingForAccessToken(redirectUri);
    }

    public void askingForAccessToken(String redirectUri){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String credentials = clientId + ":" + clientSecret;
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
        headers.set("Authorization", "Basic " + encodedCredentials);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("code", codeSpotify);
        body.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity("https://accounts.spotify.com/api/token", request, Map.class);
        
        Map<String, Object> bodySplit = response.getBody();
        
        accessToken=(String) bodySplit.get("access_token");
        refreshToken=(String) bodySplit.get("refresh_token");
    }

    public void askingForRefreshToken() throws IOException, InterruptedException{
        HttpClient client = HttpClient.newHttpClient();
        String jsonPayload = "grant_type=refresh_token&refresh_token="+refreshToken;
        String credentials = clientId + ":" + clientSecret;
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://accounts.spotify.com/api/token"))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .header("Authorization", "Basic "+encodedCredentials)
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        JSONObject json = new JSONObject(response.body());
        accessToken = json.getString("access_token");
        refreshToken = json.optString("refresh_token", refreshToken);

        System.out.println("Response: " + response.body());
    }

    public String gettingTopArtist() throws IOException, InterruptedException{
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.spotify.com/v1/me/top/artists"))
            .header("Authorization", "Bearer "+accessToken)
            .build();

        HttpResponse<String> response;
        response = client.send(request, HttpResponse.BodyHandlers.ofString());
        askingForRefreshToken();
        return response.body();

    }
}
