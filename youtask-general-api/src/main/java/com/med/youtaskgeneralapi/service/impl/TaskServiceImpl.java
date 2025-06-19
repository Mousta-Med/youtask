package com.med.youtaskgeneralapi.service.impl;

import com.med.youtaskgeneralapi.model.entity.Task;
import com.med.youtaskgeneralapi.repository.TaskRepository;
import com.med.youtaskgeneralapi.service.TaskService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository =  taskRepository;
    }

    @Override
    public Task save(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public Task findOne(UUID uuid) {
        return taskRepository.findById(uuid).orElseThrow(() -> new NoSuchElementException("Task Not found with this: " + uuid));
    }

    @Override
    public Task update(UUID uuid, Task task) {
        Task existingtask =  taskRepository.findById(uuid).orElseThrow(() -> new NoSuchElementException("Task Not found with this: " + uuid));
        BeanUtils.copyProperties(task, existingtask);
        return taskRepository.save(existingtask);
    }

    @Override
    public void delete(UUID uuid) {
        taskRepository.findById(uuid).orElseThrow(() -> new NoSuchElementException("Task Not found with this: " + uuid));
        taskRepository.deleteById(uuid);
    }
}
