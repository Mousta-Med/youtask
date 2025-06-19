package com.med.youtaskgeneralapi.service;

import java.util.List;

public interface BaseService<Request, Id, Response> {

    Response save(Request request);

    List<Response> findAll();

    Response findOne(Id id);

    Response update(Id id, Request request);

    void delete(Id id);

}
