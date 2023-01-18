package com.oracle.lad.z2h.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oracle.lad.z2h.model.Album;

/**
 * Los repositorio se pueden implementar con CrudRepository o JpaRepository.
 * Si utilizas JpaRepository no requieres realizar conversiones de tipos o
 * validaciones de opcionales.
 *
 * @author rujay
 */
public interface AlbumRepository extends JpaRepository<Album, Integer> {
}
