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

export async function POST(request: Request) {
  let body: Partial<ContactPayload>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Corpo da requisição inválido' },
      { status: 400 }
    )
  }

  const nome = body.nome?.trim()
  const empresa = body.empresa?.trim()
  const telefone = body.telefone?.trim()
  const mensagem = body.mensagem?.trim()
  const origem = body.origem?.trim()
  const horario = body.horario?.trim()

  const missing: string[] = []
  if (!nome) missing.push('nome')
  if (!empresa) missing.push('empresa')
  if (!telefone) missing.push('telefone')
  if (!mensagem) missing.push('mensagem')

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: `Campos obrigatórios ausentes: ${missing.join(', ')}`,
        missing,
      },
      { status: 400 }
    )
  }

  const digitsOnly = telefone!.replace(/\D/g, '')
  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    return NextResponse.json(
      { error: 'Telefone em formato inválido' },
      { status: 400 }
    )
  }

  if (mensagem!.length < 10) {
    return NextResponse.json(
      { error: 'Mensagem muito curta (mínimo 10 caracteres)' },
      { status: 400 }
    )
  }

  // TODO: integrar com provider de e-mail (Resend, SendGrid, etc.) ou CRM.
  // Por ora, log no servidor e responde OK.
  console.log('[contato] nova mensagem', {
    nome,
    empresa,
    cargo: body.cargo?.trim() ?? '',
    telefone,
    origem: origem ?? '',
    horario: horario ?? '',
    mensagem,
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
