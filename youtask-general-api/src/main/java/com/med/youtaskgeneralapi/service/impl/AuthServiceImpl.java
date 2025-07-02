package com.med.youtaskgeneralapi.service.impl;

import com.med.youtaskgeneralapi.jwt.JWTUtil;
import com.med.youtaskgeneralapi.model.dto.AuthRequest;
import com.med.youtaskgeneralapi.model.dto.AuthResponse;
import com.med.youtaskgeneralapi.model.dto.UserRequest;
import com.med.youtaskgeneralapi.model.dto.UserResponse;
import com.med.youtaskgeneralapi.model.entity.User;
import com.med.youtaskgeneralapi.repository.UserRepository;
import com.med.youtaskgeneralapi.service.AuthService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    public AuthResponse register(UserRequest UserRequest) {

        User user = modelMapper.map(UserRequest, User.class);
        user.setPassword(passwordEncoder.encode(UserRequest.getPassword()));
        user = userRepository.save(user);
        String token = jwtUtil.generateToken(user, "USER");
        return new AuthResponse(token,  modelMapper.map(user, UserResponse.class));

    }

    @Override
    public AuthResponse login(AuthRequest authRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmailOrUsername(),
                        authRequest.getPassword()
                )
        );
        String token = null;
        String emailOrUsername = authRequest.getEmailOrUsername();
        Optional<User> user = userRepository.findByUsernameOrEmail(emailOrUsername, emailOrUsername);

        if (user.isPresent()) {
            token = jwtUtil.generateToken(user.get(), "USER");
            return new AuthResponse(token,  modelMapper.map(user, UserResponse.class));
        }
        throw new UsernameNotFoundException("User Not Found With This Credential: " + authRequest.getEmailOrUsername());


    }
}
