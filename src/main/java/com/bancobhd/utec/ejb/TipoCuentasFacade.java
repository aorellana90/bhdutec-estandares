package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.TipoCuentas;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class TipoCuentasFacade extends AbstractFacade<TipoCuentas> implements TipoCuentasFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public TipoCuentasFacade() {
        super(TipoCuentas.class);
    }

}
