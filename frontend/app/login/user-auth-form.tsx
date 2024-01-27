"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRouter } from 'next/navigation';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const { push } = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [errorStatus, setErrorStatus] = React.useState<boolean>(false)

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

  const handleInputChange = (event: any) => {
    
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
        // const authData = await pb.collection('users').authWithPassword(
        //     formData.email,
        //     formData.password,
        //     );
        // console.log(authData)
        // if (pb.authStore.isValid){
        //     push('/')
        // }
    } catch (err){
        setErrorStatus(true)
        setTimeout(() => {
            setErrorStatus(false)
          }, 3000)
    }


    // console.log("authData: ", authData)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
              <div>
                <Label className="" htmlFor="email">
                Email
                </Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleInputChange}
                    />
            </div>
            <div>
            <Label>Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              disabled={isLoading}
              value={formData.password}
              onChange={handleInputChange}

              />
            </div>
            {errorStatus && <p className="text-red-500">Wrong credentials</p>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In
          </Button>
        </div>
      </form>
    </div>
  )
}