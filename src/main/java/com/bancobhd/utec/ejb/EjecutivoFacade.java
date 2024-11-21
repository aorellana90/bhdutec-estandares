package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Ejecutivo;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class EjecutivoFacade extends AbstractFacade<Ejecutivo> implements EjecutivoFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public EjecutivoFacade() {
        super(Ejecutivo.class);
    }

}
