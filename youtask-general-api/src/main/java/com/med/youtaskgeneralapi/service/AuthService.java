package com.med.youtaskgeneralapi.service;

import com.med.youtaskgeneralapi.model.dto.AuthRequest;
import com.med.youtaskgeneralapi.model.dto.AuthResponse;
import com.med.youtaskgeneralapi.model.dto.UserRequest;

public interface AuthService {

    AuthResponse register(UserRequest UserRequest);
    AuthResponse login(AuthRequest authRequest);

}
