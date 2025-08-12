# Logistica_Entregas

# Como testar o endpoint de pedido (POST /pedido)

## Requisitos
- Node.js e npm instalados
- Banco SQLite configurado (arquivo dev.db gerado pelo Prisma)
- Dependências instaladas (npm install)
- Servidor rodando (npm start ou comando equivalente)

## Testando com Postman

1. Inicie o backend:
   ```bash
   npm start
   ```

2. No Postman, crie uma requisição:
   - Método: POST
   - URL: http://localhost:3001/pedido
   - Body (JSON):
     ```json
     {
       "nome": "Cliente Teste",
       "endereco": "Rua Teste, 123",
       "valor": 100,
       "peso": 10
     }
     ```

3. Clique em "Send". Se tudo estiver correto, a resposta será:
   ```json
   {
     "id": 1,
     "nome": "Cliente Teste",
     "endereco": "Rua Teste, 123",
     "valor": 100,
     "peso": 10,
     "status": "pending"
   }
   ```

## Rodando os testes automatizados

1. Execute:
   ```bash
   npx jest
   ```

2. O teste de sucesso para o endpoint será executado automaticamente.