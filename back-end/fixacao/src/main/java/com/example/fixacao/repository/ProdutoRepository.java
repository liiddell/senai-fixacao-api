package com.example.fixacao.repository;

import com.example.fixacao.model.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository <ProdutoModel, Long> {
    Optional<ProdutoModel> findByNome(String nome);
    Optional<ProdutoModel> findByCodigo(String codigo);
}
