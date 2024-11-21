package com.bancobhd.utec.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegistroUsuarioDto {

    private Integer idTipoProducto;
    private Integer idTipoCuenta;
    private String numeroProducto;
    private String documentoIdentidad;
    private String usuario;
    private String clave;

}
