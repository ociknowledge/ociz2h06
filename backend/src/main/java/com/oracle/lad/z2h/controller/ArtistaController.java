package com.oracle.lad.z2h.controller;

import com.oracle.lad.z2h.model.Artista;
import com.oracle.lad.z2h.repository.ArtistaRepository;
import com.oracle.lad.z2h.util.Constant;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author rujay
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(Constant.API_ARTISTA_URL)
public class ArtistaController {
    private final ArtistaRepository repository;

    @Autowired
    public ArtistaController(ArtistaRepository repository) {
        this.repository = repository;
    }

    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Artista payload) {
        try {
            repository.save(payload);
            return new ResponseEntity<>(payload, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Artista payload) {
        try {
            Optional<Artista> compare = repository.findById(id);
            if (compare != null && compare.isPresent() && compare.get().getId().equals(payload.getId())) {
                repository.save(payload);
                return new ResponseEntity<>(payload, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(payload, HttpStatus.CONFLICT);
            }
        } catch (Exception ex) {
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            Optional<Artista> compare = repository.findById(id);
            if (compare != null && compare.isPresent()) {
                repository.delete(compare.get());
                return new ResponseEntity<>(compare.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(id, HttpStatus.CONFLICT);
            }
        } catch (Exception ex) {
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}