package com.med.youtaskgeneralapi.controller;

import com.med.youtaskgeneralapi.model.dto.TaskRequest;
import com.med.youtaskgeneralapi.model.dto.TaskResponse;
import com.med.youtaskgeneralapi.model.entity.Task;
import com.med.youtaskgeneralapi.service.TaskService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController extends BaseController<TaskRequest, UUID, TaskResponse, TaskService>{
    protected TaskController(TaskService service) {
        super(service);
    }
}
