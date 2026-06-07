import { FaGithub } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { TypographyMuted, linkVariants } from '#/components/atoms/typography'
import { FieldSeparator } from '#/components/atoms/ui/field'

function SignInFooter() {
  return (
    <>
      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="w-full">
        <Button variant="outline" className="w-full" type="button">
          <FaGithub />
          Sign in with GitHub
        </Button>
      </div>

      <div className="w-full">
        <TypographyMuted className="text-center">
          Don&apos;t have an account?{' '}
          <Link to="/register" className={linkVariants({ variant: 'muted' })}>
            Sign up
          </Link>
        </TypographyMuted>
        <TypographyMuted className="text-center">
          Forgot your password?{' '}
          <Link
            to="/forgot-password"
            className={linkVariants({ variant: 'muted' })}
          >
            Reset here
          </Link>
        </TypographyMuted>
      </div>
    </>
  )
}

export { SignInFooter }
