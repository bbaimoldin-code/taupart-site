// Cloudflare Pages Function — принимает заявку с сайта и отправляет её
// в Telegram-бот @taupart_bot. Секреты TELEGRAM_BOT_TOKEN и
// TELEGRAM_CHAT_ID задаются в Cloudflare Pages → Settings →
// Environment variables (Encrypted), не хранятся в коде.

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return new Response(JSON.stringify({ ok: false, error: "not_configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "bad_request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  var isCorporate = data.formType === "corporate";
  var lines = [isCorporate ? "<b>Запрос коммерческого предложения</b>" : "<b>Новая заявка с сайта</b>"];
  if (data.company) lines.push("Компания: " + escapeHtml(data.company));
  if (data.bin) lines.push("БИН: " + escapeHtml(data.bin));
  if (data.name) lines.push((isCorporate ? "Контактное лицо" : "Имя") + ": " + escapeHtml(data.name));
  if (data.phone) lines.push("Телефон: " + escapeHtml(data.phone));
  if (data.email) lines.push("Email: " + escapeHtml(data.email));
  if (data.object) lines.push("Объект оценки: " + escapeHtml(data.object));
  if (data.quantity) lines.push("Количество: " + escapeHtml(data.quantity));
  if (data.total) lines.push("Итого: " + escapeHtml(data.total));
  if (data.referral) lines.push("По рекомендации: " + escapeHtml(data.referralName || "да"));
  if (data.description) lines.push("Описание задачи: " + escapeHtml(data.description));
  if (data.comment) lines.push("Комментарий: " + escapeHtml(data.comment));

  var text = lines.join("\n");

  var tgResponse = await fetch(
    "https://api.telegram.org/bot" + env.TELEGRAM_BOT_TOKEN + "/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    }
  );

  if (!tgResponse.ok) {
    return new Response(JSON.stringify({ ok: false, error: "telegram_failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
