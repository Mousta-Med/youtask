package com.med.youtaskgeneralapi.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "Task Api",
                description = "Crud Api",
                contact = @Contact(
                        name = "Mohammed",
                        email = "moustamuhammed@gmail.com"
                ),
                version = "v1"
        )
)
public class OpenApiConfig {
}
