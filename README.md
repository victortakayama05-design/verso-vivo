# VersoVivo Landing Page

Estrutura pronta para deploy no Vercel via repositório no GitHub.

## O que já está pronto

- Next.js com App Router
- Tailwind CSS configurado
- Framer Motion e Lucide React instalados nas dependências
- Landing page em `app/page.tsx`
- Player de áudio funcional pronto para receber links reais
- Botões dos planos apontando para links de formulário editáveis

## Onde editar antes do lançamento

### 1) Links dos formulários
Procure por:
- `https://seuformulario.com/geral`
- `https://seuformulario.com/essencial`
- `https://seuformulario.com/especial`
- `https://seuformulario.com/prioridade`

### 2) Links das amostras de áudio
No arquivo `app/page.tsx`, edite o array `audioSamples`:
- `https://seu-link-de-audio.com/demo-principal.mp3`
- `https://seu-link-de-audio.com/amostra-amor.mp3`
- `https://seu-link-de-audio.com/amostra-familia.mp3`
- `https://seu-link-de-audio.com/amostra-memoria.mp3`

### 3) Depoimentos
Substitua os depoimentos fictícios por depoimentos reais no array `testimonials`.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run start
```

## Deploy no Vercel pelo GitHub

1. Crie um repositório novo no GitHub.
2. Faça upload de todos os arquivos desta pasta.
3. Entre na Vercel.
4. Clique em **Add New Project**.
5. Importe o repositório.
6. A Vercel vai detectar Next.js automaticamente.
7. Clique em **Deploy**.

## Observações

- O projeto não depende de variáveis de ambiente para funcionar no estado atual.
- Quando os links de áudio estiverem válidos, o player tocará normalmente no navegador.
- Para melhor credibilidade, publique com depoimentos e áudios reais antes de subir tráfego.
