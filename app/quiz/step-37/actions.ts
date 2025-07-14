"use server"

export async function submitName(quizData: { [key: string]: string | null }) {
  try {
    console.log("Submitting name data:", quizData)

    const webhookUrl =
      "https://get.emailserverside.com/webhook/191bb202fa7b1939ac3c29b22782f9cf0b9d9dd1aa722397d8ee149ef6cbc737"

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
