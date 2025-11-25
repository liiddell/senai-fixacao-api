import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import "./style.css"; 

const schema = yup.object({
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
    // reset, // Removido para simplificar, já que não é necessário limpar o formulário após a atualização
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { nome: "", preco: "", quantidade: "" }, 
  });

  const enviarDadosAtualizacao = async (formData) => {
    // AQUI ESTÁ A MUDANÇA: O endpoint usa '/atualizar/' + codigo
    const urlAtualizacao = `/atualizar/${codigoDoProduto}`; 

    try {
      // Usamos PUT para a atualização
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