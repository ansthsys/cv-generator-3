import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { GalleryVerticalEndIcon } from 'lucide-react'

interface AuthLayoutProps {
  children: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full grid min-h-dvh grid-cols-12">
      <div className="relative hidden lg:block bg-muted lg:col-span-6 xl:col-span-7">
        <img
          src="https://img.magnific.com/free-photo/empty-white-plate-colored-background_23-2148084303.jpg?t=st=1780393463~exp=1780397063~hmac=7e30ea603e577795816966139ec354f3d36af6d61d12da20c0e5c725b2328e9e&w=1480"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="bg-white flex flex-col gap-4 p-6 md:p-10 col-span-12 lg:col-span-6 xl:col-span-5">
        <div className="flex justify-start gap-2">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            Acme Inc.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
    </div>
  )
}

export { AuthLayout }
export type { AuthLayoutProps }
