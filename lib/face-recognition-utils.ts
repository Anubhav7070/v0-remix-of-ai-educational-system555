let faceapi: typeof import("face-api.js") | null = null

const loadFaceApi = async () => {
  if (faceapi) return faceapi
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    faceapi = await import("face-api.js")
    faceapi.env.monkeyPatch({ Canvas: HTMLCanvasElement, Image: HTMLImageElement, ImageData: ImageData })
    console.log("[v0] Face-API.js dynamically loaded and monkey-patched.")
  }
  return faceapi
}

export interface FaceDetection {
  box: {
    x: number
    y: number
    width: number
    height: number
  }
  confidence: number
  descriptor?: number[]
}

export class FaceRecognitionService {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private modelsLoaded = false
  private mockMode = false

  constructor() {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      this.canvas = document.createElement("canvas")
      this.ctx = this.canvas.getContext("2d")!
      this.loadModels()
    }
  }

  async loadModels() {
    if (this.modelsLoaded) return
    try {
      console.log("[v0] Attempting to load Face-API.js models from /models...")

      const MODEL_URL = "/models"
      const currentFaceApi = await loadFaceApi()
      if (!currentFaceApi) {
        throw new Error("Face-API.js not loaded in browser environment.")
      }

      // Try to load each model individually to provide better error feedback
      await currentFaceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
      console.log("[v0] Tiny Face Detector model loaded")

      await currentFaceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
      console.log("[v0] Face Landmark 68 model loaded")

      await currentFaceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      console.log("[v0] Face Recognition model loaded")

      this.modelsLoaded = true
      this.mockMode = false
      console.log("[v0] All Face-API.js models loaded successfully")
    } catch (error) {
      console.warn("[v0] Face-API.js models not found. Switching to mock mode for demonstration.", error)
      this.mockMode = true
      this.modelsLoaded = false

      console.log("[v0] To use real face recognition:")
      console.log("[v0] 1. Download models from: https://github.com/justadudewhohacks/face-api.js/tree/master/weights")
      console.log("[v0] 2. Create a 'public/models' directory in your project")
      console.log("[v0] 3. Place the following files in public/models:")
      console.log("[v0]    - tiny_face_detector_model-weights_manifest.json")
      console.log("[v0]    - tiny_face_detector_model-shard1")
      console.log("[v0]    - face_landmark_68_model-weights_manifest.json")
      console.log("[v0]    - face_landmark_68_model-shard1")
      console.log("[v0]    - face_recognition_model-weights_manifest.json")
      console.log("[v0]    - face_recognition_model-shard1")
    }
  }

  async detectFaces(video: HTMLVideoElement): Promise<FaceDetection[]> {
    if (this.mockMode) {
      // Mock face detection for demonstration
      console.log("[v0] Using mock face detection")
      return this.generateMockFaceDetection()
    }

    if (!this.modelsLoaded) {
      console.warn("[v0] Face-API.js models not loaded yet. Cannot detect faces.")
      return []
    }
    const currentFaceApi = await loadFaceApi()
    if (!currentFaceApi) {
      console.error("[v0] Face-API.js not available for detection.")
      return []
    }

    try {
      const detections = await currentFaceApi
        .detectAllFaces(video, new currentFaceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()

      return detections.map((d) => ({
        box: {
          x: d.detection.box.x,
          y: d.detection.box.y,
          width: d.detection.box.width,
          height: d.detection.box.height,
        },
        confidence: d.detection.score,
        descriptor: Array.from(d.descriptor),
      }))
    } catch (error) {
      console.error("[v0] Error during face detection:", error)
      return []
    }
  }

  private generateMockFaceDetection(): FaceDetection[] {
    // Generate a mock face detection in the center of typical video dimensions
    const mockFace: FaceDetection = {
      box: {
        x: 200 + Math.random() * 100, // Add some randomness
        y: 150 + Math.random() * 50,
        width: 120 + Math.random() * 40,
        height: 150 + Math.random() * 30,
      },
      confidence: 0.85 + Math.random() * 0.1,
      descriptor: this.generateRandomDescriptor(),
    }

    // Randomly return 0-2 faces for variety
    const numFaces = Math.floor(Math.random() * 3)
    return Array.from({ length: numFaces }, (_, i) => ({
      ...mockFace,
      box: {
        ...mockFace.box,
        x: mockFace.box.x + i * 150, // Offset multiple faces
      },
    }))
  }

  // Generate random face descriptor for demo
  private generateRandomDescriptor(): number[] {
    return Array.from({ length: 128 }, () => Math.random() * 2 - 1)
  }

  // Extract face descriptor from image
  async extractFaceDescriptor(
    imageElement: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  ): Promise<number[] | null> {
    if (this.mockMode) {
      console.log("[v0] Using mock face descriptor extraction")
      return this.generateRandomDescriptor()
    }

    if (!this.modelsLoaded) {
      console.warn("[v0] Face-API.js models not loaded yet. Cannot extract face descriptor.")
      return null
    }
    const currentFaceApi = await loadFaceApi()
    if (!currentFaceApi) {
      console.error("[v0] Face-API.js not available for descriptor extraction.")
      return null
    }
    try {
      const detection = await currentFaceApi
        .detectSingleFace(imageElement, new currentFaceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (detection && detection.descriptor) {
        return Array.from(detection.descriptor)
      }
      return null
    } catch (error) {
      console.error("[v0] Error extracting face descriptor:", error)
      return null
    }
  }

  // Draw face detection boxes on canvas
  drawFaceBoxes(canvas: HTMLCanvasElement, faces: FaceDetection[], studentNames?: (string | null)[]) {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    faces.forEach((face, index) => {
      const { box, confidence } = face
      const studentName = studentNames?.[index]

      const mockIndicator = this.mockMode ? " (DEMO)" : ""

      // Draw bounding box
      ctx.strokeStyle = studentName ? "#10b981" : "#ef4444"
      ctx.lineWidth = 2
      ctx.strokeRect(box.x, box.y, box.width, box.height)

      // Draw label background
      const label = studentName
        ? `${studentName}${mockIndicator}`
        : `Unknown (${(confidence * 100).toFixed(1)}%)${mockIndicator}`
      const labelWidth = ctx.measureText(label).width + 10
      const labelHeight = 20

      ctx.fillStyle = studentName ? "#10b981" : "#ef4444"
      ctx.fillRect(box.x, box.y - labelHeight, labelWidth, labelHeight)

      // Draw label text
      ctx.fillStyle = "white"
      ctx.font = "12px Arial"
      ctx.fillText(label, box.x + 5, box.y - 5)
    })
  }

  get isInMockMode(): boolean {
    return this.mockMode
  }
}

export const faceRecognitionService = typeof window !== "undefined" ? new FaceRecognitionService() : null
