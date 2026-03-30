import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, signerName, signerDate, fields } = body;

    const fieldRows = Object.entries(fields as Record<string, string>)
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#888;font-size:13px;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:6px 12px;color:#fff;font-size:13px;">${v}</td></tr>`)
      .join('');

    const html = `
      <div style="background:#0a0a0a;padding:40px 20px;font-family:Arial,sans-serif;">
        <div style="max-width:680px;margin:0 auto;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;overflow:hidden;">
          <div style="background:#111;padding:24px 32px;border-bottom:1px solid #2a2a2a;">
            <h1 style="margin:0;font-size:20px;color:#c9a227;letter-spacing:0.05em;">CCR Kennels — ${formType}</h1>
            <p style="margin:6px 0 0;color:#888;font-size:13px;">Submitted by <strong style="color:#fff;">${signerName}</strong> on ${signerDate}</p>
          </div>
          <div style="padding:24px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              ${fieldRows}
            </table>
          </div>
          <div style="padding:16px 32px;border-top:1px solid #2a2a2a;background:#111;">
            <p style="margin:0;color:#555;font-size:12px;">This submission was sent from ccrcorsos.com</p>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'CCR Kennels <noreply@ccrcorsos.com>',
      to: 'ccrkennels2022@gmail.com',
      subject: `New ${formType} — ${signerName}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('send-form error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
