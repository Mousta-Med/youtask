package com.med.youtaskgeneralapi.service.impl;

import com.med.youtaskgeneralapi.model.dto.TaskResponse;
import com.med.youtaskgeneralapi.model.entity.Task;
import com.med.youtaskgeneralapi.model.entity.User;
import com.med.youtaskgeneralapi.model.enums.TaskStatus;
import com.med.youtaskgeneralapi.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private TaskServiceImpl taskService;

    private User user;

    @BeforeEach
    public void setup() {
        user = new User();
    }

    @Test
    public void testFindOne_Success() {
        UUID taskId = UUID.randomUUID();
        Task mockTask = new Task("Test", "just for test", TaskStatus.COMPLETED, user);
        mockTask.setId(taskId);

        TaskResponse mockResponse = new TaskResponse();
        mockResponse.setId(taskId);
        mockResponse.setTitle("Test");
        mockResponse.setDescription("just for test");

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(mockTask));
        when(modelMapper.map(mockTask, TaskResponse.class)).thenReturn(mockResponse);
        TaskResponse result = taskService.findOne(taskId);

        assertNotNull(result);
        assertEquals(taskId, result.getId());
        assertEquals("Test", result.getTitle());
        assertEquals("just for test", result.getDescription());

        verify(taskRepository, times(1)).findById(taskId);
    }



}
