import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import "./style.css"; 

const schema = yup.object({
  codigo: yup
    .string()
    .required("O código é obrigatório.")
    .min(5, "O código deve ter pelo menos 5 caracteres."),
  nome: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres."),
  preco: yup
    .number()
    .typeError("O preço deve ser um número.")
    .required("O preço é obrigatório."),
  quantidade: yup
    .number()
    .typeError("A quantidade deve ser um número.")
    .min(1, "A quantidade mínima é 1.")
    .required("A quantidade é obrigatória."),
});

// Suponhamos que o CÓDIGO do produto a ser atualizado seja passado via prop.
function PaginaDeAtualizacao({ codigoDoProduto = "ABC12345" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    // ⚠️ MUDANÇA: Adição do campo 'codigo' ao defaultValues
    defaultValues: { codigo: codigoDoProduto, nome: "", preco: "", quantidade: "" },
  });

  const enviarDadosAtualizacao = async (formData) => {
    // ⚠️ ATENÇÃO: Se o código for alterado no formulário, a URL AINDA usa o código original (codigoDoProduto) para encontrar o registro no backend.
    // O backend espera o código na URL para identificar o produto a ser atualizado.
    const urlAtualizacao = `/atualizar/${codigoDoProduto}`;

    try {
      // Usamos PUT para a atualização
      // ⚠️ ATENÇÃO: Se o backend permitir alterar o código, ele precisa fazer a lógica de encontrar o produto pelo `codigoDoProduto` (da URL)
      // e depois setar o novo código (do `formData.codigo`).
      const resposta = await api.put(urlAtualizacao, formData);

      toast.success(resposta?.data?.mensagem || "Produto atualizado com sucesso!");
    } catch (erro) {
      const status = erro?.response?.status;
      const mensagem = erro?.response?.data?.mensagem || "Erro ao atualizar produto.";

      if (status === 404) {
        toast.error(`Produto com código ${codigoDoProduto} não encontrado.`);
      } else if (status === 409) {
        // Exemplo de erro de validação do servidor
        setError("nome", {
          type: "server",
          message: mensagem,
        });
      }

      toast.error(mensagem);
      console.error("Erro na atualização:", erro);
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Atualização de Produto (CÓDIGO: {codigoDoProduto})</h1>

      <form noValidate onSubmit={handleSubmit(enviarDadosAtualizacao)}>

        {/* 🚀 NOVO CAMPO: Código */}
        <div className="form-group">
          <label htmlFor="campo-codigo">Código</label>
          <input
            id="campo-codigo"
            type="text"
            placeholder="Ex.: PROD001"
            {...register("codigo")}
            // Se o código não deve ser editado após a criação, adicione: readOnly={true}
          />
          {errors.codigo && <p className="error-message">{errors.codigo.message}</p>}
        </div>
        {/* Fim do Novo Campo */}

        {/* Nome */}
        <div className="form-group">
          <label htmlFor="campo-nome">Nome</label>
          <input
            id="campo-nome"
            type="text"
            placeholder="Ex.: Bom Bril"
            {...register("nome")}
          />
          {errors.nome && <p className="error-message">{errors.nome.message}</p>}
        </div>

        {/* Preço */}
        <div className="form-group">
          <label htmlFor="campo-preco">Preço</label>
          <input
            id="campo-preco"
            type="number"
            step="0.01"
            placeholder="Ex.: 19.99"
            {...register("preco")}
          />
          {errors.preco && <p className="error-message">{errors.preco.message}</p>}
        </div>

        {/* Quantidade */}
        <div className="form-group">
          <label htmlFor="campo-quantidade">Quantidade</label>
          <input
            id="campo-quantidade"
            type="number"
            placeholder="Ex.: 10"
            {...register("quantidade")}
          />
          {errors.quantidade && (
            <p className="error-message">{errors.quantidade.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Atualizando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeAtualizacao;