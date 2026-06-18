import type { ReactNode } from 'react'
import { Navbar } from '#/components/organisms/layout/Navbar'
import { Footer } from '#/components/organisms/layout/Footer'
import { Container } from '#/components/atoms/common/Container'

interface AppLayoutProps {
  children: ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Container className="flex-1 py-6">{children}</Container>
      </main>
      <Footer />
    </div>
  )
}

export { AppLayout }
