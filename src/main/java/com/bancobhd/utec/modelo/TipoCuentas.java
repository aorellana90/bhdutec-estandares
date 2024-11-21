package com.bancobhd.utec.modelo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tipocuentas")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class TipoCuentas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTipoCuenta")
    private Integer idTipoCuenta;

    @Size(max = 150)
    @Column(name = "descripcion", length = 150)
    private String descripcion;

}
