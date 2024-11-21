package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Producto;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class ProductoFacade extends AbstractFacade<Producto> implements ProductoFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ProductoFacade() {
        super(Producto.class);
    }

    @Override
    public Producto buscarProductoPorTipoNumero(int idTipoProducto, String numeroProducto) {
        Producto producto = null;
        StringBuilder consulta = new StringBuilder();

        try {
            consulta.append("select * from producto ");
            consulta.append("where idTipoProducto = ? and numeroProducto like ?");
            Query query = em.createNativeQuery(consulta.toString(), Producto.class);
            query.setParameter(1, idTipoProducto);
            query.setParameter(2, numeroProducto);
            List<Producto> lista = query.getResultList();
            if (!lista.isEmpty()) {
                producto = lista.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return producto;
    }

    @Override
    public List<Producto> listaProductoPorCliente(int idCliente) {
        List<Producto> lista = null;
        StringBuilder consulta = new StringBuilder();

        try {
            consulta.append("select * from producto ");
            consulta.append("where idCliente = ?");
            Query query = em.createNativeQuery(consulta.toString(), Producto.class);
            query.setParameter(1, idCliente);
            lista = query.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return lista;
    }

}
