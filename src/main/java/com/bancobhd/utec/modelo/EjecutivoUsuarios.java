package com.bancobhd.utec.modelo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ejecutivousuarios")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class EjecutivoUsuarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEjecutivoUs")
    private Integer idEjecutivoUs;

    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "usuario", length = 20)
    private String usuario;

    @NotNull
    @Size(min = 1, max = 5000)
    @Column(name = "clave", length = 5000)
    private String clave;

    @Column(name = "estado")
    private Boolean estado;

    @Column(name = "fechaCreacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;

    @JoinColumn(name = "idEjecutivo", referencedColumnName = "idEjecutivo")
    @ManyToOne(fetch = FetchType.EAGER)
    private Ejecutivo ejecutivo;

    @JoinColumn(name = "idRol", referencedColumnName = "idRol")
    @ManyToOne(fetch = FetchType.EAGER)
    private Roles roles;

}
