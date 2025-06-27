package com.med.youtaskgeneralapi.model.dto;

import com.med.youtaskgeneralapi.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {

    private String accessToken;

    private UserResponse user;

}
