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

    // Clean base64 data - more robust handling
    const base64Data = imageBase64.split(',')[1] || imageBase64;

    const prompt = `You are a professional aesthetician and skincare consultant. Analyze this facial photo.

    CRITICAL SAFETY GATE:
    If the image is not a human face, return ONLY this error object: 
    { "error": "Please upload a clear photo of your face for analysis." }

    Otherwise, provide a detailed analysis with the following fields:
    1. skinType: (dry, oily, combination, normal, sensitive)
    2. concerns: (list 2-4 specific concerns like: acne, fine lines, hyperpigmentation, dullness, enlarged pores, redness, dehydration)
    3. recommendations: Pick 3-5 treatments from the list below.
    4. summary: 2-3 sentence overview.

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

    Respond ONLY with valid JSON.`;

    try {
        console.log('[Gemini] Sending request to Gemini API...');

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                                    data: base64Data
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.1, // Stability
                        response_mime_type: "application/json",
                        response_schema: {
                            type: "OBJECT",
                            properties: {
                                skinType: { type: "STRING" },
                                concerns: { type: "ARRAY", items: { type: "STRING" } },
                                recommendations: {
                                    type: "ARRAY",
                                    items: {
                                        type: "OBJECT",
                                        properties: {
                                            treatmentId: {
                                                type: "STRING",
                                                enum: [
                                                    "aes1", "aes2", "aes3", "aes4", "aes5", "aes6", "aes7", "aes8",
                                                    "skin1", "skin2", "skin3", "skin4", "skin5", "skin6",
                                                    "body1", "body2", "body3", "body4", "body5", "body6", "body7",
                                                    "nail1", "nail2", "nail3", "nail4", "nail5", "nail6",
                                                    "lash1", "lash2", "lash3", "lash4", "lash5", "lash6",
                                                    "wax1", "wax2", "wax3", "wax4", "wax5", "wax6",
                                                    "hair1", "hair2", "hair3", "hair4", "hair5", "hair6",
                                                    "makeup1", "makeup2", "makeup3", "makeup4"
                                                ]
                                            },
                                            reason: { type: "STRING" },
                                            priority: { type: "STRING", enum: ["high", "medium", "low"] }
                                        },
                                        required: ["treatmentId", "reason", "priority"]
                                    }
                                },
                                summary: { type: "STRING" }
                            },
                            required: ["skinType", "concerns", "recommendations", "summary"]
                        }
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

        // Safety check for response structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error('[Gemini] Invalid response structure:', data);
            throw new Error('Invalid response from Gemini API');
        }

        const textResponse = data.candidates[0].content.parts[0].text;

        // Direct parse - no regex needed thanks to JSON mode
        let result;
        try {
            result = JSON.parse(textResponse);
        } catch (parseError) {
            console.error('[Gemini] JSON parse error:', parseError);
            console.error('[Gemini] Raw text:', textResponse);
            throw new Error('Failed to parse AI response as JSON.');
        }

        // Handle Safety Gate Error
        if (result.error) {
            console.warn('[Gemini] Safety gate triggered:', result.error);
            throw new Error(result.error);
        }

        // Validate required fields
        if (!result.skinType || !result.concerns || !result.recommendations || !result.summary) {
            console.error('[Gemini] Missing required fields in result:', result);
            throw new Error('AI analysis clearly incomplete. Please try again with a better photo.');
        }

        console.log('[Gemini] Analysis successful!');
        return result as SkinAnalysisResult;

    } catch (error) {
        console.error('[Gemini] Error in analyzeSkin:', error);
        throw error;
    }
}
