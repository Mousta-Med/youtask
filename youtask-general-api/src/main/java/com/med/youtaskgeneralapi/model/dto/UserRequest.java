package com.med.youtaskgeneralapi.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    @NotBlank(message = "UserName is required")
    @Size(max = 20, message = "UserName must not exceed 20 characters")
    private String username;
    @NotBlank(message = "Email is required")
    @Size(max = 50, message = "Email must not exceed 50 characters")
    private String email;
    @NotBlank(message = "Password is required")
    @Size(max = 20, message = "Password must not exceed 20 characters")
    private String password;

}
