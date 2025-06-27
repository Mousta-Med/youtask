package com.med.youtaskgeneralapi.repository;

import com.med.youtaskgeneralapi.model.dto.TaskResponse;
import com.med.youtaskgeneralapi.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<TaskResponse> findAllByUserId(UUID id);
}
