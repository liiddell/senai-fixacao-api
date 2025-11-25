package com.example.fixacao.services;

import com.example.fixacao.dto.ProdutoRequestDTO;
import com.example.fixacao.dto.ProdutoResponseDTO;
import com.example.fixacao.model.ProdutoModel;
import com.example.fixacao.repository.ProdutoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoServices {
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<ProdutoResponseDTO> listar() {
        return produtoRepository.findAll()
                .stream()
                .map(p -> new ProdutoResponseDTO(p.getCodigo(), p.getNome(), p.getPreco(), p.getQuantidade()))
                .toList();
    }

    public ProdutoModel salvar(@Valid ProdutoRequestDTO dto) {
        if (produtoRepository.findByNome(dto.getNome()).isPresent()) {
            throw new IllegalArgumentException("Produto já cadastrado");
        }

        ProdutoModel produto = new ProdutoModel();
        produto.setCodigo(dto.getCodigo());
        produto.setNome(dto.getNome());
        produto.setPreco(dto.getPreco());
        produto.setQuantidade(dto.getQuantidade());

        produtoRepository.save(produto);
        return produto;
    }

    public ProdutoModel atualizar(String codigo, @Valid ProdutoRequestDTO dto) {

        ProdutoModel produto = produtoRepository.findByCodigo(dto.getCodigo())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Atualiza somente os campos necessários
        produto.setNome(dto.getNome());
        produto.setPreco(dto.getPreco());
        produto.setQuantidade(dto.getQuantidade());

        return produtoRepository.save(produto);
    }


    public void deletar(String codigo) {

        ProdutoModel produto = produtoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produtoRepository.delete(produto);
    }

}
