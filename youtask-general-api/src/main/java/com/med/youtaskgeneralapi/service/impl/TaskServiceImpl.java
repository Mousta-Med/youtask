package com.med.youtaskgeneralapi.service.impl;

import com.med.youtaskgeneralapi.model.dto.TaskRequest;
import com.med.youtaskgeneralapi.model.dto.TaskResponse;
import com.med.youtaskgeneralapi.model.entity.Task;
import com.med.youtaskgeneralapi.repository.TaskRepository;
import com.med.youtaskgeneralapi.service.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository,  ModelMapper modelMapper) {
        this.taskRepository =  taskRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public TaskResponse save(TaskRequest taskrequest) {
        Task task = modelMapper.map(taskrequest, Task.class);
        return modelMapper.map(taskRepository.save(task), TaskResponse.class);
    }

    @Override
    public List<TaskResponse> findAll() {
        return taskRepository
                .findAll()
                .stream()
                .map(task -> modelMapper.map(task, TaskResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse findOne(UUID uuid) {
        return taskRepository.findById(uuid)
                .map(task -> modelMapper.map(task, TaskResponse.class)).orElseThrow(() -> new NoSuchElementException("Task Not found with this: " + uuid));
    }

    @Override
    public TaskResponse update(UUID uuid, TaskRequest task) {
        Task existingtask =  taskRepository.findById(uuid).orElseThrow(() -> new NoSuchElementException("Task Not found with this: " + uuid));
        BeanUtils.copyProperties(task, existingtask);
        return modelMapper.map(taskRepository.save(existingtask), TaskResponse.class);
    }

    @Override
    public void delete(UUID uuid) {
        taskRepository.findById(uuid).orElseThrow(() -> new NoSuchElementException("Task Not found with this: " + uuid));
        taskRepository.deleteById(uuid);
    }
}
