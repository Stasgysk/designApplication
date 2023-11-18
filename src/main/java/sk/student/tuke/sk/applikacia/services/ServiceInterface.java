package sk.student.tuke.sk.applikacia.services;

import sk.student.tuke.sk.applikacia.exceptions.DatabaseError;

import java.util.List;

public interface ServiceInterface<T> {
    List<T> getAll() throws DatabaseError;
    void add(T t);

    void deleteById(T t);

    void deleteById(Long id);

    T findById(T t) throws DatabaseError;

    T findById(Long id) throws DatabaseError;
}
