// Server-side Gemini API integration for skin analysis

export interface SkinAnalysisRequest {
    imageBase64: string;
}

export interface TreatmentRecommendation {
    treatmentId: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
}

export interface SkinAnalysisResult {
    skinType: string;
    concerns: string[];
    recommendations: TreatmentRecommendation[];
    summary: string;
}

export async function analyzeSkin(imageBase64: string): Promise<SkinAnalysisResult> {
    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY not found in environment variables');
    }

    const prompt = `You are a professional aesthetician and skincare consultant. Analyze this facial photo and provide:

1. Skin Type (dry, oily, combination, normal, sensitive)
2. Visible Concerns (list 2-4 specific concerns like: acne, fine lines, hyperpigmentation, dullness, enlarged pores, redness, dehydration, etc.)
3. Treatment Recommendations (pick 3-5 treatment IDs from this list based on the skin analysis):

AVAILABLE TREATMENTS:
- aes1: Botox (for wrinkles/fine lines)
- aes2: Lip Fillers (for volume)
- aes5: Chemical Peel (for texture, pigmentation, acne scars)
- aes6: PRP Vampire Facial (for overall rejuvenation, texture)
- skin1: Luxury Facial (general maintenance, hydration)
- skin2: HydraFacial (deep cleansing, hydration, glow)
- skin3: Microdermabrasion (exfoliation, texture, dullness)
- skin4: LED Light Therapy (acne, redness, collagen)
- skin5: Dermaplaning (exfoliation, smoothness, peach fuzz)

For each recommendation, explain WHY in 1 sentence.

4. Summary: 2-3 sentence overview of their skin and recommended skincare journey.

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "skinType": "combination",
  "concerns": ["fine lines around eyes", "uneven skin tone", "enlarged pores"],
  "recommendations": [
    {"treatmentId": "aes6", "reason": "PRP will improve overall skin texture and reduce fine lines naturally", "priority": "high"},
    {"treatmentId": "skin2", "reason": "HydraFacial will deeply cleanse pores and restore hydration", "priority": "high"},
    {"treatmentId": "skin4", "reason": "LED therapy will boost collagen production for anti-aging benefits", "priority": "medium"}
  ],
  "summary": "Your combination skin shows early signs of aging and would benefit from a rejuvenating treatment plan. We recommend starting with HydraFacial for immediate glow, followed by PRP for long-term texture improvement."
}`;

    try {
        console.log('[Gemini] Sending request to Gemini API...');

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: 'image/jpeg',
                                    data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.4,
                        candidateCount: 1,
                    }
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Gemini] API error response:', errorText);
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('[Gemini] Got response:', JSON.stringify(data).substring(0, 200));

        // Check if we got a valid response structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('[Gemini] Invalid response structure:', data);
            throw new Error('Invalid response from Gemini API');
        }

        const textResponse = data.candidates[0].content.parts[0].text;
        console.log('[Gemini] Extracted text response:', textResponse);

        // Try to extract JSON from markdown code blocks if present
        let jsonString = textResponse;
        const jsonMatch = textResponse.match(/```json\s*([\s\S]*?)\s*```/) ||
            textResponse.match(/```\s*([\s\S]*?)\s*```/);

        if (jsonMatch && jsonMatch[1]) {
            jsonString = jsonMatch[1];
            console.log('[Gemini] Extracted JSON from code block');
        }

        // Parse the JSON
        let result;
        try {
            result = JSON.parse(jsonString.trim());
            console.log('[Gemini] Successfully parsed JSON');
        } catch (parseError) {
            console.error('[Gemini] JSON parse error:', parseError);
            console.error('[Gemini] Failed to parse:', jsonString);
            throw new Error('Failed to parse AI response as JSON. The AI may have returned an invalid format.');
        }

        // Validate the result has required fields
        if (!result.skinType || !result.concerns || !result.recommendations || !result.summary) {
            console.error('[Gemini] Missing required fields in result:', result);
            throw new Error('AI response missing required fields');
        }

        console.log('[Gemini] Analysis successful!');
        return result as SkinAnalysisResult;

    } catch (error) {
        console.error('[Gemini] Error in analyzeSkin:', error);
        throw error;
    }
}
