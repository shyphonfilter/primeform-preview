# PrimeForm 3D — vitrine de homologação (GitHub Pages)

Prévia estática da vitrine v3, publicada para avaliação de layout, responsividade,
filtro por categoria e links de orçamento **antes** de replicar para produção.

> Esta é uma prévia de homologação. Não é o site de produção e não substitui o
> catálogo oficial servido pela API.

## O que é

- Vitrine estática (HTML + CSS + JS), sem build e sem dependências externas.
- Catálogo servido de `assets/data/catalogo.json` (37 itens reais, sanitizado:
  nome, categoria, preço de venda e quantidade por lote).
- Sem backend: o `CONFIG.api` do `app.js` aponta para o JSON estático em vez de
  `/api/products`. Essa é a **única** diferença de runtime em relação ao app
  que roda em produção.

## Estrutura

```
index.html                     página da vitrine
assets/app.js                  lógica de menu, scroll-spy e catálogo
assets/catalog.css             estilos dos cartões e do filtro
assets/data/catalogo.json      catálogo de homologação (37 itens)
assets/images/                 logo e imagens do hero
```

## Diferenças em relação à produção

| Item | Produção | Esta prévia |
|---|---|---|
| Origem dos produtos | API `/api/products` | `assets/data/catalogo.json` |
| Fotos dos produtos | `/uploads/` (servidor) | sem foto — card mostra "Imagem indisponível" |
| Categorias | campo `category` da API | campo `category` do JSON (veja observação) |

### Observação sobre as categorias

O export do catálogo de origem (Nicepage) não preservou as categorias reais e
entregou todos os 37 itens como `Outros`. Por isso o filtro por categoria
aparece com uma única opção nesta prévia. As categorias oficiais são:

`Action figure` · `Anime` · `Personalizados` · `Chaveiros` · `Decorativos` · `Outros`

A reclassificação com dados reais depende da API oficial e será aplicada aqui
depois. Nada foi inventado para preencher esse campo.

## Publicação

Publicada por GitHub Actions a partir de `main`. Para republicar: qualquer push
em `main` dispara o workflow. Configuração: **Settings → Pages → Source: GitHub Actions**.

## Segurança

Este repositório é público e contém apenas conteúdo já exibido publicamente no
site (nomes, categorias, preços de venda e WhatsApp). Não há aqui custos,
margens, dados do precificador, credenciais, bancos de dados ou fotos de produto.
