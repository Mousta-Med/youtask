package com.med.youtaskgeneralapi.controller;

import com.med.youtaskgeneralapi.model.entity.Task;
import com.med.youtaskgeneralapi.service.TaskService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController extends BaseController<Task, UUID, Task, TaskService>{
    protected TaskController(TaskService service) {
        super(service);
    }
}
