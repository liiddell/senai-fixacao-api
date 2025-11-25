import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../service/api";
import "./style.css"; 

// Validação do formulário com Yup
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

function PaginaDeAtualizacao() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { codigo: "", nome: "", preco: "", quantidade: "" },
  });

  const enviarDadosAtualizacao = async (formData) => {
  const urlAtualizacao = `/cadastro/${formData.codigo}`;

  try {
    const resposta = await api.put(urlAtualizacao, {
      codigo: formData.codigo, // <- importante
      nome: formData.nome,
      preco: formData.preco,
      quantidade: formData.quantidade,
    });

    toast.success(resposta?.data?.mensagem || "Produto atualizado com sucesso!");
  } catch (erro) {
    const status = erro?.response?.status;
    const mensagem = erro?.response?.data?.mensagem || "Erro ao atualizar produto.";

    if (status === 404) {
      toast.error(`Produto com código ${formData.codigo} não encontrado.`);
    } else {
      toast.error(mensagem);
    }

    console.error("Erro na atualização:", erro);
  }
};

  return (
    <div className="cadastro-container">
      <h1>Atualização de Produto</h1>

      <form noValidate onSubmit={handleSubmit(enviarDadosAtualizacao)}>

        {/* Campo: Código */}
        <div className="form-group">
          <label htmlFor="campo-codigo">Código</label>
          <input
            id="campo-codigo"
            type="text"
            placeholder="Ex.: PROD001"
            {...register("codigo")}
          />
          {errors.codigo && <p className="error-message">{errors.codigo.message}</p>}
        </div>

        {/* Campo: Nome */}
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

        {/* Campo: Preço */}
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

        {/* Campo: Quantidade */}
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
