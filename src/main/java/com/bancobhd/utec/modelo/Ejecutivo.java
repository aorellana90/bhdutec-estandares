package com.bancobhd.utec.modelo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "ejecutivo")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Ejecutivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEjecutivo")
    private Integer idEjecutivo;

    @NotNull
    @Size(min = 1, max = 75)
    @Column(name = "nombres", length = 75)
    private String nombres;

    @NotNull
    @Size(min = 1, max = 75)
    @Column(name = "apellidos", length = 75)
    private String apellidos;

    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "documentoIdentidad", length = 10)
    private String documentoIdentidad;

    @NotNull
    @Column(name = "fechaDeNacimiento")
    @Temporal(TemporalType.DATE)
    private Date fechaDeNacimiento;

    @NotNull
    @Size(min = 1, max = 120)
    @Column(name = "correoElectronico", length = 120)
    private String correoElectronico;

    @NotNull
    @Size(min = 1, max = 9)
    @Column(name = "telefono", length = 9)
    private String telefono;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "areaAsignada", length = 50)
    private String areaAsignada;

}
