import { NextResponse } from 'next/server'

interface ContactPayload {
  nome: string
  empresa: string
  cargo?: string
  telefone: string
  mensagem: string
  origem?: string
  horario?: string
}

const MAX_BODY_BYTES = 8 * 1024
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const rateLimitHits = new Map<string, { count: number; resetAt: number }>()

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = rateLimitHits.get(key)

  if (rateLimitHits.size > 1000) {
    for (const [storedKey, hit] of rateLimitHits) {
      if (hit.resetAt <= now) rateLimitHits.delete(storedKey)
    }
  }

  if (!current || current.resetAt <= now) {
    rateLimitHits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX_REQUESTS
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Requisicao muito grande' },
      { status: 413 }
    )
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em instantes.' },
      { status: 429 }
    )
  }

  let body: Partial<ContactPayload>
  try {
    const rawBody = await request.text()
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Requisicao muito grande' },
        { status: 413 }
      )
    }

    const parsed: unknown = JSON.parse(rawBody)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json(
        { error: 'Corpo da requisicao invalido' },
        { status: 400 }
      )
    }

    body = parsed as Partial<ContactPayload>
  } catch {
    return NextResponse.json(
      { error: 'Corpo da requisicao invalido' },
      { status: 400 }
    )
  }

  const nome = normalizeText(body.nome, 100)
  const empresa = normalizeText(body.empresa, 120)
  const cargo = normalizeText(body.cargo, 100)
  const telefone = normalizeText(body.telefone, 30)
  const mensagem = normalizeText(body.mensagem, 1000)
  const origem = normalizeText(body.origem, 80)
  const horario = normalizeText(body.horario, 80)

  const missing: string[] = []
  if (!nome) missing.push('nome')
  if (!empresa) missing.push('empresa')
  if (!telefone) missing.push('telefone')
  if (!mensagem) missing.push('mensagem')

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: `Campos obrigatorios ausentes: ${missing.join(', ')}`,
        missing,
      },
      { status: 400 }
    )
  }

  const digitsOnly = telefone.replace(/\D/g, '')
  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    return NextResponse.json(
      { error: 'Telefone em formato invalido' },
      { status: 400 }
    )
  }

  if (mensagem.length < 10) {
    return NextResponse.json(
      { error: 'Mensagem muito curta (minimo 10 caracteres)' },
      { status: 400 }
    )
  }

  console.info('[contato] solicitacao recebida', {
    hasNome: Boolean(nome),
    hasEmpresa: Boolean(empresa),
    hasCargo: Boolean(cargo),
    hasOrigem: Boolean(origem),
    hasHorario: Boolean(horario),
    telefoneFinal: digitsOnly.slice(-4),
    mensagemLength: mensagem.length,
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
