import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const anthropic = new Anthropic()

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const {
      email,
      phone,
      preferredIngestion,
      name,
      age,
      heightFt,
      heightIn,
      weight,
      biologicalSex,
      goals,
      activityLevel,
      healthConditions,
      medications,
    } = formData

    const goalLabels: Record<string, string> = {
      fat_loss: 'Fat Loss',
      muscle_gain: 'Muscle Gain',
      longevity: 'Longevity',
      anti_aging: 'Anti-Aging',
      recovery: 'Recovery',
      sleep: 'Sleep Optimization',
      cognitive: 'Cognitive Performance',
    }

    const activityLabels: Record<string, string> = {
      sedentary: 'Sedentary (little or no exercise)',
      lightly_active: 'Lightly Active (1–3 days/week)',
      moderately_active: 'Moderately Active (3–5 days/week)',
      very_active: 'Very Active (6–7 days/week)',
      extremely_active: 'Extremely Active (athletes or physical job)',
    }

    const goalsList = (goals as string[]).map((g: string) => goalLabels[g] || g).join(', ')
    const activityLabel = activityLabels[activityLevel] || activityLevel

    const prompt = `You are a peptide research assistant helping users understand experimental peptides based on their biometric profile and goals. Based on the following user profile, recommend 3–5 relevant research peptides.

User Profile:
- Email: ${email || 'Not provided'}
- Phone: ${phone || 'Not provided'}
- Preferred ingestion: ${preferredIngestion || 'Not specified'} (oral, injection, or pen)
- Name: ${name}
- Age: ${age} years old
- Height: ${heightFt}ft ${heightIn || '0'}in
- Weight: ${weight} lbs
- Biological Sex: ${biologicalSex}
- Primary Goals: ${goalsList}
- Activity Level: ${activityLabel}
- Current Health Conditions: ${healthConditions || 'None reported'}
- Current Medications/Supplements: ${medications || 'None reported'}

Return ONLY a valid JSON array. No markdown formatting, no code blocks, no explanation text—just the raw JSON array starting with [ and ending with ].

Each object in the array must have exactly these fields:
{
  "name": "Peptide name (e.g., BPC-157)",
  "mechanism": "2-3 sentences describing the mechanism of action—how it works biochemically based on current research",
  "whyItFits": "1-2 sentences explaining why this peptide fits this specific user's profile, goals, age, activity level, and health context",
  "typicalDosage": "Typical experimental dosage range cited in research (e.g., '250–500 mcg')",
  "frequency": "Injection/administration frequency (e.g., 'Once daily', '5 days on, 2 days off')",
  "bestTimeToAdminister": "Optimal timing (e.g., 'Morning on empty stomach', 'Evening before bed')",
  "stackingOptions": "Common peptides or compounds this is often stacked with in research protocols (e.g., 'BPC-157, Ipamorelin')",
  "contraindications": "Known contraindications, drug interactions, or cautions to be aware of (e.g., pregnancy, certain conditions, medication interactions)"
}

Selection guidelines:
- Factor in preferred ingestion: if "oral" prefer oral/administerable peptides where available; if "injection" or "pen" injectable options are fine
- Prioritize peptides most relevant to the user's stated goals
- Consider biological sex (e.g., GHK-Cu, hormonal peptides differ by sex)
- Factor in age (e.g., older users may benefit more from Epithalon, GH secretagogues)
- Consider activity level (e.g., highly active users benefit more from BPC-157, TB-500)
- Do not recommend peptides with known negative interactions with reported medications
- Include any relevant contraindications given the user's health conditions and medications

Peptide library to draw from (not exhaustive):
BPC-157, TB-500, CJC-1295 (with or without DAC), Ipamorelin, GHRP-2, GHRP-6, HGH Fragment 176-191, Epithalon/Epitalon, Selank, Semax, PT-141 (Bremelanotide), GHK-Cu, Thymosin Alpha-1, LL-37, AOD-9604, MOTS-c, Humanin, Dihexa, Melanotan II, Kisspeptin-10, VIP (Vasoactive Intestinal Peptide), DSIP (Delta Sleep-Inducing Peptide), Sermorelin, Tesamorelin, Hexarelin, Follistatin 344, IGF-1 LR3, PEG-MGF, Snap-8, Leuphasyl.

Return 3–5 recommendations most relevant to this user's profile. This is for research and educational purposes only.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Robustly parse JSON — strip markdown code fences if present
    let jsonText = content.text.trim()
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '')
    }

    const recommendations = JSON.parse(jsonText)

    if (!Array.isArray(recommendations)) {
      throw new Error('Expected JSON array from Claude')
    }

    return NextResponse.json({
      recommendations,
      disclaimer:
        'This information is for research and educational purposes only. It does not constitute medical advice. Peptides are research chemicals not approved by the FDA for human therapeutic use. Always consult a licensed physician before using any peptides.',
    })
  } catch (error) {
    console.error('Error generating recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations. Please try again.' },
      { status: 500 }
    )
  }
}
