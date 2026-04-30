# IGA Tecnologia — Site institucional

Site oficial da **IGA Sistemas e Consultoria** (igatecnologia.com.br) — consultoria ERP, Business Intelligence e análise de dados, atuando há 23 anos em São Paulo.

Construído em Next.js 15 (App Router) com foco em performance, identidade visual forte e micro-interações.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router) + React 18 |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 3.4 + CSS variables (light/dark) |
| Tipografia | Outfit (display), Inter (body), JetBrains Mono — via `next/font` |
| Animação | Framer Motion 11, Lottie, Three.js (WebGL/shaders) |
| UI primitives | Radix UI (Dialog, Separator, Slot) |
| Carrossel | Embla Carousel + Autoplay |
| Ícones | lucide-react |
| Utils | clsx + tailwind-merge, class-variance-authority |

---

## Começando

Pré-requisitos: **Node.js 20+** e **npm** (ou pnpm/yarn/bun).

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev      # Dev server (Next.js)
npm run build    # Build de produção
npm run start    # Servir build (após build)
npm run lint     # ESLint (next/core-web-vitals)
```

---

## Estrutura

```
.
├── app/
│   ├── api/contact/route.ts     # Endpoint do formulário (POST)
│   ├── solucoes/page.tsx        # Página de soluções
│   ├── layout.tsx               # Root layout + metadata SEO
│   ├── page.tsx                 # Home (lazy load das seções)
│   ├── not-found.tsx            # 404
│   └── globals.css              # Tokens e camadas Tailwind
├── components/
│   ├── layout/                  # Navbar, Footer, FloatingActions
│   ├── sections/                # Hero, Services, Methodology, FAQ, Contact, etc.
│   └── ui/                      # Button, Badge, Carousel, Cursor, Lottie, WebGL…
├── lib/
│   ├── animations.ts            # Variants e easings reutilizáveis
│   ├── data.ts                  # Conteúdo (empresa, serviços, depoimentos, FAQ…)
│   ├── fonts.ts                 # Configuração next/font
│   └── utils.ts                 # cn() e helpers
├── public/                      # Assets estáticos (logos, imagens, lotties)
├── types/                       # Tipagens compartilhadas
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

A `home` carrega o `Hero` no bundle inicial e usa `next/dynamic` para as demais seções, reduzindo o JS crítico.

---

## Design system

Definido em `tailwind.config.ts` e `app/globals.css`:

- **Cores brand fixas**: `royal #1B5EA6`, `royal-light #2874C8`, `accent #4A90D9`, `amber #F5A524`, `coral #E85D3B`, `paper #F7F3EC`, `dark-bg #060D1A`.
- **Cores theme-aware** (light/dark via `.theme-dark`): `bg`, `surface`, `surface-2`, `ink`, `muted`, `border`, `border-blue` — ligadas a CSS variables.
- **Tipografia fluida**: `display-xl/lg/md` e `body-lg/base` com `clamp()` (responsivo sem media queries).
- **Backgrounds**: `hero-glow`, `card-shine`, `royal-grad`, `dots`, `grid`, `noise`.
- **Sombras**: `royal`, `glow`, `glow-amber`, `cta`, `cta-amber`, `paper`.
- **Animações**: `shimmer`, `float`, `pulse-glow`.

> **Atenção em valores arbitrários do Tailwind**: nunca usar espaços dentro de `[]`. Use `px-[clamp(1.25rem,5vw,2rem)]`, **não** `px-[clamp(1.25rem, 5vw, 2rem)]`.

---

## API — Formulário de contato

`POST /api/contact`

Payload:

```ts
{
  nome: string       // obrigatório
  empresa: string    // obrigatório
  cargo?: string
  telefone: string   // 10–13 dígitos (após strip de não-dígitos)
  mensagem: string   // mínimo 10 caracteres
}
```

Respostas:

- `200` `{ ok: true }` — recebido com sucesso
- `400` `{ error: string, missing?: string[] }` — payload inválido

> Hoje a rota apenas loga no servidor. Para produção, integrar com provedor de e-mail (Resend, SendGrid) ou CRM. Ver `app/api/contact/route.ts`.

---

## Acessibilidade

- Skip link `Pular para o conteúdo` (visível ao foco) em `app/layout.tsx`.
- Estados de foco visíveis em todos os interativos.
- Hierarquia semântica de headings em cada seção.
- `prefers-reduced-motion` deve ser respeitado em qualquer animação nova (padrão do projeto).

---

## SEO

Metadata definido em `app/layout.tsx` (Open Graph, canonical, robots, keywords). `metadataBase` resolve URLs relativas a partir de `company.site` em `lib/data.ts`.

Para mudar o domínio canônico, edite `company.site` em `lib/data.ts`.

---

## Deploy

Otimizado para **Vercel** (zero config). Após push, conectar o repositório em vercel.com/new.

```bash
# Deploy manual (requer Vercel CLI: npm i -g vercel)
vercel           # preview
vercel --prod    # produção
```

---

## Convenções

- Componentes em **PascalCase**, utilitários em **camelCase**.
- Conteúdo editorial centralizado em `lib/data.ts` — não hardcodar texto em componentes.
- Animações reutilizáveis em `lib/animations.ts`.
- Use `cn()` de `lib/utils.ts` para mesclar classes condicionais.

---

## Licença

Projeto privado — IGA Sistemas e Consultoria © 2001–presente.
