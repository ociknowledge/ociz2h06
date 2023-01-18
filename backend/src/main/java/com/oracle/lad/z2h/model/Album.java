package com.oracle.lad.z2h.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author rujay
 */
@Entity
@Table(name = "album")
@XmlRootElement
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = true)
    private Integer id;

    @Column(name = "nombre", length = 150, nullable = false)
    private String nombre;

    @Column(name = "foto", length = 150, nullable = true)
    private String foto;

    @Column(name = "lanzamiento", length = 4, nullable = false)
    private String lanzamiento;

    @Transient
    private String fotoB64;

    public Album() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getLanzamiento() {
        return lanzamiento;
    }

    public void setLanzamiento(String lanzamiento) {
        this.lanzamiento = lanzamiento;
    }

    public String getFotoB64() {
        return fotoB64;
    }

    public void setFotoB64(String fotoB64) {
        this.fotoB64 = fotoB64;
    }    
}