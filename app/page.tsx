import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HandIcon, ArrowRightIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Breaking Barriers in Sign Language Communication
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  SignBridge translates sign language gestures in real-time, making communication accessible for
                  everyone.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/translate">
                  <Button size="lg" className="gap-2">
                    Start Translation <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-b from-primary/20 to-primary/5 p-4 flex items-center justify-center">
                <HandIcon className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                SignBridge uses advanced machine learning to recognize and translate sign language in real-time.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/20 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Capture</h3>
              <p className="text-center text-muted-foreground">
                Your device's camera captures sign language gestures in real-time.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/20 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Recognize</h3>
              <p className="text-center text-muted-foreground">
              Our model recognizes gestures with high accuracy using machine learning techniques.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/20 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Translate</h3>
              <p className="text-center text-muted-foreground">
                The recognized gestures are translated into Malayalam text and speech.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Malayalam Support</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                SignBridge now includes comprehensive support for Malayalam, bridging communication gaps for Malayalam
                speakers.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Real-time translation of sign language to Malayalam characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Text-to-speech functionality for Malayalam pronunciation</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Comprehensive mapping of Malayalam alphabets with English transliterations</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Bilingual interface for both English and Malayalam users</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center p-4 rounded-lg border">
                  <p className="text-3xl font-bold mb-2">അ</p>
                  <p className="text-sm text-muted-foreground">ah</p>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg border">
                  <p className="text-3xl font-bold mb-2">ക</p>
                  <p className="text-sm text-muted-foreground">ka</p>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg border">
                  <p className="text-3xl font-bold mb-2">മ</p>
                  <p className="text-sm text-muted-foreground">ma</p>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg border">
                  <p className="text-3xl font-bold mb-2">ത</p>
                  <p className="text-sm text-muted-foreground">tha</p>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg border">
                  <p className="text-3xl font-bold mb-2">ന</p>
                  <p className="text-sm text-muted-foreground">na</p>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg border">
                  <p className="text-3xl font-bold mb-2">പ</p>
                  <p className="text-sm text-muted-foreground">pa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/translate">
              <Button size="lg">Try Malayalam Translation Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
