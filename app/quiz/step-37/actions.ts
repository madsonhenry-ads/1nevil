// Local do arquivo: app/quiz/step-37/actions.ts (Versão Final e Robusta)
"use server"

// Função auxiliar para encontrar um contato existente pelo e-mail
async function findContactByEmail(email: string, apiUrl: string, apiToken: string) {
  const url = `${apiUrl}/api/3/contacts?email=${encodeURIComponent(email)}`
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Api-Token": apiToken,
      },
    })
    if (!response.ok) {
      console.error("Failed to fetch contact by email", await response.text())
      return null
    }
    const data = await response.json()
    // Retorna o primeiro contato encontrado ou null se não houver nenhum
    return data.contacts && data.contacts.length > 0 ? data.contacts[0] : null
  } catch (error) {
    console.error("Error in findContactByEmail:", error)
    return null
  }
}

export async function submitName(quizData: { [key: string]: string | null }) {
  // 1. Extrair o nome e o e-mail do objeto de dados do quiz
  const name = quizData.name
  const email = quizData.email

  // 2. Validar se temos as informações necessárias
  if (!name) {
    return { success: false, error: "Name was not provided." }
  }
  if (!email) {
    return { success: false, error: "Email not found from previous step." }
  }

  // 3. Carregar as credenciais da API a partir das variáveis de ambiente
  const API_URL = process.env.ACTIVE_CAMPAIGN_API_URL
  const API_TOKEN = process.env.ACTIVE_CAMPAIGN_API_TOKEN

  if (!API_URL || !API_TOKEN) {
    console.error("Missing ActiveCampaign environment variables for name submission")
    return { success: false, error: "Server configuration error." }
  }

  try {
    // 4. Encontrar o contato no ActiveCampaign usando o e-mail
    console.log(`Searching for contact with email: ${email}...`)
    const contact = await findContactByEmail(email, API_URL, API_TOKEN)

    // Se o contato não for encontrado, não podemos atualizá-lo.
    // Isso é um caso de borda, mas é bom tratar. Retornamos sucesso para não quebrar o fluxo do usuário.
    if (!contact) {
      console.warn(`Contact with email ${email} not found. Cannot update name.`)
      return { success: true } // Evita que o usuário veja um erro
    }

    const contactId = contact.id
    console.log(`Contact found. ID: ${contactId}. Updating first name...`)

    // 5. Atualizar o contato com o novo nome
    const updateResponse = await fetch(`${API_URL}/api/3/contacts/${contactId}`, {
      method: "PUT", // Usamos PUT para atualizar
      headers: {
        "Content-Type": "application/json",
        "Api-Token": API_TOKEN,
      },
      body: JSON.stringify({
        contact: {
          firstName: name, // A API do ActiveCampaign usa 'firstName'
        },
      }),
    })

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      console.error("Error updating contact on ActiveCampaign:", {
        status: updateResponse.status,
        body: errorData,
      })
      return { success: false, error: "Failed to update contact data." }
    }

    console.log("✅ First name updated successfully!")
    return { success: true }
  } catch (error) {
    console.error("🔥 Unexpected error in submitName server action:", error)
    return { success: false, error: "An unexpected error occurred." }
  }
}
