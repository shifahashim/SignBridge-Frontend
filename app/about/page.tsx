import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Github, Mail, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">About SignBridge</h1>
        <p className="text-muted-foreground">Breaking communication barriers through technology</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p>
            SignBridge was created with a simple yet powerful mission: to bridge the communication gap between the deaf
            and hearing communities through accessible technology.
          </p>
          <p>
            We believe that communication is a fundamental human right, and our goal is to make sign language
            translation available to everyone, everywhere, at any time.
          </p>

          <h2 className="text-2xl font-bold mt-8">How It Works</h2>
          <p>
            SignBridge uses advanced machine learning algorithms to recognize sign language gestures in real-time. Our
            technology can:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Capture hand gestures through your device's camera</li>
            <li>Process and recognize signs with medium accuracy</li>
            <li>Translate signs into text and speech </li>
          </ul>

          <div className="mt-8">
            <Link href="/translate">
              <Button size="lg">Try SignBridge Now</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Our Team</h3>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Diverse Expertise</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team combines expertise in machine learning, accessibility, and sign language linguistics to
                      create an accurate and user-friendly solution.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Open Source</h4>
                    <p className="text-sm text-muted-foreground">
                      SignBridge is an open-source project, welcoming contributions from developers and sign language
                      experts worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Get in Touch</h4>
                    <p className="text-sm text-muted-foreground">
                      Have questions or want to collaborate? Reach out to our team at{" "}
                      <a href="mailto:signbridge93@gmail.com" className="text-primary hover:underline">
                        signbridge93@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

