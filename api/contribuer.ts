export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).end('Méthode non autorisée');
    return;
  }

  const { nom, message } = req.body;

  const webhookURL = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookURL) {
    res.status(500).json({ error: 'Webhook Discord non défini' });
    return;
  }

  try {
    await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📢 Nouvelle contribution reçue :\n👤 Nom : ${nom}\n💬 Message : ${message}`
      }),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Échec de l’envoi vers Discord' });
  }
}
