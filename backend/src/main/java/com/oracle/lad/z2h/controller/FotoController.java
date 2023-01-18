package com.oracle.lad.z2h.controller;

import com.oracle.lad.z2h.model.Album;
import com.oracle.lad.z2h.repository.AlbumRepository;
import com.oracle.lad.z2h.util.Constant;

import java.io.FileOutputStream;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author rujay
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(Constant.API_FOTO_URL)
public class FotoController {
    private final AlbumRepository repository;

    @Autowired
    public FotoController(AlbumRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> uploadContent(@PathVariable Integer id, @RequestParam("file") MultipartFile file) {
        try {
            try (FileOutputStream fos = new FileOutputStream(Constant.PATH_IMAGE_DISK + id.toString() + ".jpg")) {
                fos.write(file.getBytes());
            }
            Optional<Album> compare = repository.findById(id);
            if (compare != null && compare.isPresent()) {
                Album data = compare.get();
                data.setFoto(id.toString() + ".jpg");
                repository.save(data);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }
}