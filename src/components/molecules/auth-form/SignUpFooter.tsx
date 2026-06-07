import { FaGithub } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { TypographyMuted, linkVariants } from '#/components/atoms/typography'
import { FieldSeparator } from '#/components/atoms/ui/field'

function SignUpFooter() {
  return (
    <>
      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="w-full">
        <Button variant="outline" className="w-full" type="button">
          <FaGithub />
          Sign up with GitHub
        </Button>
      </div>

      <div className="w-full">
        <TypographyMuted className="text-center">
          Already have an account?{' '}
          <Link to="/login" className={linkVariants({ variant: 'muted' })}>
            Sign in
          </Link>
        </TypographyMuted>
      </div>
    </>
  )
}

export { SignUpFooter }
