package com.med.youtaskgeneralapi.service;

import com.med.youtaskgeneralapi.model.dto.TaskRequest;
import com.med.youtaskgeneralapi.model.dto.TaskResponse;
import com.med.youtaskgeneralapi.model.entity.Task;

import java.util.UUID;

public interface TaskService extends BaseService<TaskRequest, UUID, TaskResponse>{
}
