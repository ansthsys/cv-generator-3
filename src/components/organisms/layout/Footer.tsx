import { Container } from '#/components/atoms/common/Container'

function Footer() {
  return (
    <footer className="border-t border-primary">
      <Container className="flex h-12 items-center justify-between py-0">
        <span className="text-xs text-muted-foreground">CV Generator</span>
        <span className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}
        </span>
      </Container>
    </footer>
  )
}

export { Footer }
