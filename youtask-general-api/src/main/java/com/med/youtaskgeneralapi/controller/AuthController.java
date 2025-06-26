package com.med.youtaskgeneralapi.controller;

import com.med.youtaskgeneralapi.model.dto.AuthRequest;
import com.med.youtaskgeneralapi.model.dto.AuthResponse;
import com.med.youtaskgeneralapi.model.dto.UserRequest;
import com.med.youtaskgeneralapi.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController{

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest authRequest) {
        return ResponseEntity.ok(authService.login(authRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid UserRequest userRequest) {
        return ResponseEntity.ok(authService.register(userRequest));
    }
}
