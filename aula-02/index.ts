import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

const registrarHora = (req: Request, res: Response, next: NextFunction) => {
  const agora = new Date().toISOString();
  console.log(` Requisição feita em: ${agora}`);
  next();
};
app.use(registrarHora);

const horarioRestrito = (req: Request, res: Response, next: NextFunction) => {
  const horaAtual = new Date().getHours();
  if (horaAtual >= 0 && horaAtual < 6) {
    return res.status(403).json({ mensagem: 'Serviço indisponível entre 00h e 06h.' });
  }
  next();
};  
app.use(horarioRestrito);

app.get('/sobre', (req: Request, res: Response): Response => {
  return res.status(200).json({
    nome: 'Gustavo Ribeiro',
    idade: 20,
    descricao: 'Desenvolvedor em formação, trabalho com tecnologia e programação.'
  });
});

app.post('/comentarios', (req: Request, res: Response): Response => {
  const { texto } = req.body;

  if (!texto || texto.trim() === '') {
    return res.status(400).json({ mensagem: 'Texto do comentário é obrigatório.' });
  }

  return res.status(201).json({ mensagem: 'Comentário recebido com sucesso!', texto });
});

app.delete('/comentarios/:id', (req: Request, res: Response): Response => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ mensagem: 'ID não fornecido.' });
  }

  return res.status(204).send(); 
});

app.use((req: Request, res: Response): Response => {
  return res.status(404).json({ mensagem: 'Rota não encontrada!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
