// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { AIProjectClient } from "@azure/ai-projects";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.AZURE_CLIENT_ENDPOINT!;
const apiKey = process.env.AZURE_CLIENT_API!;
const agentId = process.env.AZURE_AGENT_ID!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  try {
    const client = new AIProjectClient(endpoint, new AzureKeyCredential(apiKey));
    const thread = await client.agents.threads.create();
    await client.agents.messages.create(thread.id, "user", message);

    let run = await client.agents.runs.create(thread.id, agentId);
    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((res) => setTimeout(res, 1000));
      run = await client.agents.runs.get(thread.id, run.id);
    }

    if (run.status === "failed") {
      return res.status(500).json({ error: run.lastError });
    }

    const messages = await client.agents.messages.list(thread.id, { order: "asc" });
    const last = messages[messages.length - 1];
    const content = last?.content?.find(c => c.type === "text" && "text" in c);

    return res.status(200).json({ response: content?.text?.value || "No response" });
  } catch (err) {
    console.error("Chat API Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
