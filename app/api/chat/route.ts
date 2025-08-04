import { NextResponse } from 'next/server';
import { AIProjectClient } from "@azure/ai-projects";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.AZURE_CLIENT_ENDPOINT!;
const apiKey = process.env.AZURE_CLIENT_API!;
const agentId = "asst_cTRgZj9OwBOMrs6kXwVArken"; // SaintSal-Cookin Agent

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 });

    const client = new AIProjectClient(endpoint, new AzureKeyCredential(apiKey));

    const thread = await client.agents.threads.create();
    await client.agents.messages.create(thread.id, "user", message);

    let run = await client.agents.runs.create(thread.id, agentId);
    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((res) => setTimeout(res, 1000));
      run = await client.agents.runs.get(thread.id, run.id);
    }

    if (run.status === "failed") {
      return NextResponse.json({ error: run.lastError }, { status: 500 });
    }

    const messages = await client.agents.messages.list(thread.id, { order: "asc" });
    const last = [...messages].pop();
    const content = last?.content.find(c => c.type === 'text' && 'text' in c);

    return NextResponse.json({ response: content?.text.value || "(No response)" });
  } catch (err) {
    console.error("Chat API Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
