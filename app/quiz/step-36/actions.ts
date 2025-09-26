// Local do arquivo: app/quiz/step-36/actions.ts (Versão Final e Robusta)
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
    return data.contacts && data.contacts.length > 0 ? data.contacts[0] : null
  } catch (error) {
    console.error("Error in findContactByEmail:", error)
    return null
  }
}

export async function submitEmail(quizData: { email: string; [key: string]: any }) {
  const { email } = quizData

  // Validação básica do e-mail no servidor
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please provide a valid email." }
  }

  const API_URL = process.env.ACTIVE_CAMPAIGN_API_URL
  const API_TOKEN = process.env.ACTIVE_CAMPAIGN_API_TOKEN
  const TAG_ID = process.env.ACTIVE_CAMPAIGN_TAG_ID_QUIZ // Usando a variável de ambiente específica do quiz

  if (!API_URL || !API_TOKEN || !TAG_ID) {
    console.error("Missing ActiveCampaign environment variables for quiz")
    return { success: false, message: "Server configuration error." }
  }

  try {
    let contactId: string

    // 1. Tentar criar o contato
    const createContactResponse = await fetch(`${API_URL}/api/3/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Token": API_TOKEN,
      },
      body: JSON.stringify({
        contact: {
          email: email,
          // Se você tiver um campo de telefone no quizData, pode adicioná-lo aqui
          // phone: quizData.phone || "",
          status: 1, // 1 = subscribed
        },
      }),
    })

    const responseData = await createContactResponse.json()

    // 2. Lidar com a resposta
    if (createContactResponse.ok) {
      contactId = responseData.contact.id
      console.log(`✅ New quiz contact created successfully. ID: ${contactId}`)
    } else if (createContactResponse.status === 422) {
      console.warn("⚠️ Quiz contact with this email already exists. Finding ID...")
      const existingContact = await findContactByEmail(email, API_URL, API_TOKEN)
      if (existingContact) {
        contactId = existingContact.id
        console.log(`✅ Existing quiz contact found. ID: ${contactId}`)
      } else {
        console.error("❌ 422 Error, but could not find the existing contact.", responseData)
        throw new Error("Unprocessable entity, but could not find existing contact.")
      }
    } else {
      console.error("❌ Error creating contact on ActiveCampaign:", {
        status: createContactResponse.status,
        body: responseData,
      })
      throw new Error(`Failed to create or find contact. Status: ${createContactResponse.status}`)
    }

    // 3. Adicionar a tag ao contato (novo ou existente)
    console.log(`🚀 Adding QUIZ TAG ID ${TAG_ID} to CONTACT ID ${contactId}...`)
    const tagResponse = await fetch(`${API_URL}/api/3/contactTags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Token": API_TOKEN,
      },
      body: JSON.stringify({
        contactTag: {
          contact: contactId,
          tag: TAG_ID,
        },
      }),
    })

    if (!tagResponse.ok) {
      const tagErrorData = await tagResponse.json()
      console.error("❌ Error adding tag on ActiveCampaign:", {
        status: tagResponse.status,
        body: tagErrorData,
      })
      // Não retornamos erro aqui para não impedir o usuário de avançar
    } else {
      console.log("✅ Quiz tag added successfully!")
    }

    // Se tudo deu certo, retorna sucesso para o front-end
    return { success: true }
  } catch (error) {
    console.error("🔥 Unexpected error in submitEmail server action:", error)
    return { success: false, message: "Could not save your data. Please try again." }
  }
}
