import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Bots fill the hidden field; pretend success and drop it
  if (body.website) return NextResponse.json({ ok: true });

  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // TODO: email this to your team (Resend, Nodemailer) or save it to a database
  console.log("New inquiry:", body);

  return NextResponse.json({ ok: true });
}