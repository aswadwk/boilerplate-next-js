"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const route = useRouter();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        route.push("/home");
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="hidden bg-muted lg:block">
                    <Image
                        src="/placeholder.svg"
                        alt="placeholder"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Login</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={data.email}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                email: e.target.value,
                                            })
                                        }
                                        tabIndex={0}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Link
                                            href="/forgot-password"
                                            className="inline-block ml-auto text-sm underline"
                                            tabIndex={-1}
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={data.password}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                        tabIndex={0}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    tabIndex={0}
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-center">
                            Don&apos;t have an account?{" "}
                            <Link href="#" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
