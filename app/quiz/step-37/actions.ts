"use server"

export async function submitName(quizData: { [key: string]: string | null }) {
  try {
    console.log("Submitting name data:", quizData)

    const webhookUrl =
      "https://get.flwg.cc/webhook/9db597ded52c3e7eed10955cf7c81804b6557ed265d882d589fbe6eb3337169b"

    const payload = {
      tag: "liven - usuario criado",
      type: "usuario-criado",
      data: quizData,
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Webhook response not ok:", response.status, response.statusText)
      return { success: false, error: "Failed to submit data" }
    }

    const result = await response.text()
    console.log("Webhook response:", result)

    return { success: true }
  } catch (error) {
    console.error("Error submitting name:", error)
    return { success: false, error: "Network error occurred" }
  }
}
