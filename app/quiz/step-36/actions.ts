"use server"

interface QuizData {
  email: string
  gender?: string | null
  age?: string | null
  [key: string]: string | null | undefined
}

export async function submitEmail(quizData: QuizData) {
  try {
    const webhookUrl =
      "https://get.emailserverside.com/webhook/191bb202fa7b1939ac3c29b22782f9cf0b9d9dd1aa722397d8ee149ef6cbc737"

    // Prepare the payload for the webhook
    const payload = {
      email: quizData.email,
      tag: "liven - usuario criado",
      type: "usuario-criado",
      data: {
        gender: quizData.gender,
        age: quizData.age,
        timestamp: new Date().toISOString(),
        // Include all quiz responses
        quizResponses: Object.fromEntries(
          Object.entries(quizData).filter(([key]) => key !== "email" && key !== "gender" && key !== "age"),
        ),
      },
    }

    console.log("Sending to webhook:", payload)

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Webhook error:", response.status, response.statusText)
      return { success: false, error: "Failed to submit email" }
    }

    const result = await response.json()
    console.log("Webhook response:", result)

    return { success: true, data: result }
  } catch (error) {
    console.error("Error submitting email:", error)
    return { success: false, error: "Failed to submit email" }
  }
}
