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
                .map(p -> new ProdutoResponseDTO(p.getNome(), p.getPreco(), p.getQuantidade()))
                .toList();
    }

    public ProdutoModel salvar(@Valid ProdutoRequestDTO dto) {
        if (produtoRepository.findByNome(dto.getNome()).isPresent()) {
            throw new IllegalArgumentException("Produto já cadastrado");
        }

        ProdutoModel produto = new ProdutoModel();
        produto.setNome(dto.getNome());
        produto.setPreco(dto.getPreco());
        produto.setQuantidade(dto.getQuantidade());

        produtoRepository.save(produto);
        return produto;
    }

    public ProdutoModel atualizar (Long id, @Valid ProdutoRequestDTO dto) {
        if (!produtoRepository.existsById(id)){
            throw new RuntimeException("Produto não encontrado");
        }

        ProdutoModel produto = new ProdutoModel();

        produto.setId(id);

        produto.setNome(dto.getNome());
        produto.setPreco(dto.getPreco());
        produto.setQuantidade(dto.getQuantidade());

        produtoRepository.save(produto);
        return produto;
    }

    public void deletar (Long id){
        if (!produtoRepository.existsById(id)){
            throw new RuntimeException("Produto não encontrado");
        }
        produtoRepository.deleteById(id);
    }
}
