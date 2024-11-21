package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.TipoTransacciones;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class TipoTransaccionesFacade extends AbstractFacade<TipoTransacciones> implements TipoTransaccionesFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public TipoTransaccionesFacade() {
        super(TipoTransacciones.class);
    }

}
