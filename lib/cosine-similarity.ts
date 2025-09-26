export function calculateCosineSimilarity(descriptor1: number[], descriptor2: number[]): number {
  if (descriptor1.length !== descriptor2.length) {
    throw new Error("Descriptors must have the same length")
  }

  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  for (let i = 0; i < descriptor1.length; i++) {
    dotProduct += descriptor1[i] * descriptor2[i]
    magnitude1 += descriptor1[i] * descriptor1[i]
    magnitude2 += descriptor2[i] * descriptor2[i]
  }

  magnitude1 = Math.sqrt(magnitude1)
  magnitude2 = Math.sqrt(magnitude2)

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0 // Avoid division by zero
  }

  return dotProduct / (magnitude1 * magnitude2)
}
