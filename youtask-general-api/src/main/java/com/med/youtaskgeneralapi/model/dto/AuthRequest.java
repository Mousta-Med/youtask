package com.med.youtaskgeneralapi.model.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {

    @NotEmpty(message = "username or email should be not empty")
    private String emailOrUsername;

    @NotEmpty(message = "password should be not empty")
    private String password;

}