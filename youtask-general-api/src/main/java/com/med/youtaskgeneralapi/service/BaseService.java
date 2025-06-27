package com.med.youtaskgeneralapi.service;

import java.util.List;
import java.util.UUID;

public interface BaseService<Request, Id, Response> {

    Response save(Request request);

    List<Response> findAll();

    List<Response> findAllByUserId(UUID id);

    Response findOne(Id id);

    Response update(Id id, Request request);

    void delete(Id id);

}
