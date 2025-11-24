package com.example.fixacao.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProdutoResponseDTO {
    private String nome;
    private Double preco;
    private int quantidade;
}
