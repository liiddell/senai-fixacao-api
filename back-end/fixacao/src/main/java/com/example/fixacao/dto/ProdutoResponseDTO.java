package com.example.fixacao.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ProdutoResponseDTO {
    private String codigo;
    private String nome;
    private Double preco;
    private int quantidade;

    public ProdutoResponseDTO() {
    }

    public ProdutoResponseDTO(String codigo, String nome, Double preco, int quantidade) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getNome() {
        return nome;
    }

    public Double getPreco() {
        return preco;
    }

    public int getQuantidade() {
        return quantidade;
    }
}
