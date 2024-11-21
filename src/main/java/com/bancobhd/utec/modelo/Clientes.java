package com.bancobhd.utec.modelo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "clientes")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Clientes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCliente")
    private Integer idCliente;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "nombres", length = 60)
    private String nombres;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "apellidos", length = 60)
    private String apellidos;

    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "documentoIdentidad", length = 10)
    private String documentoIdentidad;

    @NotNull
    @Size(min = 1, max = 9)
    @Column(name = "telefono", length = 9)
    private String telefono;

    @NotNull
    @Size(min = 1, max = 200)
    @Column(name = "correo", length = 200)
    private String correo;

    @NotNull
    @Size(min = 1, max = 300)
    @Column(name = "direccion", length = 300)
    private String direccion;

}
