"use client"
import { ReactNode, useEffect } from "react";
import { gapi } from "gapi-script";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
    className?: string;
    children: ReactNode;
}

const MaxWidthWrapper = ({
    className,
    children
}: MaxWidthWrapperProps) => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "config.googleClientId",
                scope: ""
            });
        }
        gapi.load("client:auth2", start);
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    return (
        <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
