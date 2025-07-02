package com.med.youtaskgeneralapi.controller;

import com.med.youtaskgeneralapi.service.BaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public abstract class BaseController<Request, Id, Response, Service extends BaseService<Request, Id, Response>> {

    private final Service service;

    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    protected BaseController(Service service) {
        this.service = service;
    }


    @GetMapping
    public ResponseEntity<List<Response>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<Response>> findAllByUserId(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findAllByUserId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> findOne(@PathVariable Id id) {
        return ResponseEntity.ok(service.findOne(id));
    }


    @PostMapping
    public ResponseEntity<Response> save(@RequestBody @Valid Request userDto) {
        return ResponseEntity.ok(service.save(userDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Response> update(@PathVariable Id id, @RequestBody @Valid Request userDto) {
        return ResponseEntity.ok(service.update(id, userDto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable(name = "id") Id id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
