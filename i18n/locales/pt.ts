export const ptBR = {
  api: {
    user: {
      cant: {
        access: {
          userRegister: {
            message:
              "Você não tem permissão para acessar a área de registro de usuário.",
            action: "Deslogue e tente novamente.",
          },
          message: "Você não tem permissão para executar essa ação.",
          action: "Tente novamente com credenciais autorizadas.",
        },
      },
    },
  },
  validation: {
    someWrongData: {
      message: "Algum dado está incorreto.",
      action: "Insira os dados com as formatações corretas.",
    },
    missingRequiredKeys: {
      message: "Algum campo obrigatório está faltando.",
      action: "insira todos os dados necessários.",
    },
    password: {
      mismatch: {
        message: "As senhas não conferem.",
        action: "Insira a mesma senha nos dois campos.",
      },
    },
    email: {
      exists: {
        message: "Este e-mail já está cadastrado.",
        action: "Use outro e-mail para cadastrar essa conta.",
      },
      wrongFormat: {
        message: "CPF precisa estar em um formato válido",
      },
    },
    cpf: {
      exists: {
        message: "Este CPF já está cadastrado.",
        action: "Tente fazer login ou use outro CPF.",
      },
    },
    email_cpf: {
      exists: {
        message: "Já existe um cadastrado com esse CPF ou e-mail.",
        action: "Tente fazer login ou use outras credenciais.",
      },
    },
  },
};
