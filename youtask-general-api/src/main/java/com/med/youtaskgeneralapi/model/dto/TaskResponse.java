package com.med.youtaskgeneralapi.model.dto;

import com.med.youtaskgeneralapi.model.enums.TaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class TaskResponse {

    private UUID id;
    private String title;
    private String description;
    private TaskStatus status;
    private String createdBy;
    private LocalDateTime CreatedDate;
    private String lastModifiedBy;
    private LocalDateTime lastModifiedDate;

}