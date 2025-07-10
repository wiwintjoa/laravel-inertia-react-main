/**
 * look up method to get city, prefectures, local based on postcode
 * @param {*} postcode 
 * @param {*} prefectures 
 * @returns 
 */
export async function lookupPostcode(postcode, prefectures = []) {
    try {
        const response = await fetch("/postcode-lookup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify({ postcode }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Lookup failed");
        }

        const matchedPref = prefectures.find(
            (p) =>
                p.name === result.prefecture ||
                p.display_name === result.prefecture
        );

        const prefectureId = matchedPref ? matchedPref.id : null;

        return {
            prefecture: result.prefecture || "",
            prefecture_id: prefectureId,
            city: result.city || "",
            local: result.local || "",
        };
    } catch (error) {
        console.error("Postcode lookup error:", error);
        return null;
    }
}
