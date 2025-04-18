"use client";

interface ErrorProps {
    status?: string
    message: string
}

export default function ErrorPage(props : ErrorProps) {
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center bg-white dark:bg-slate-800">
                <div className="flex m-4 p-4 w-1/2 flex-col text-center">
                    <h1 className="text-gray-900 dark:text-white text-3xl font-bold">{props.status}</h1>
                    <h2 className="text-gray-900 dark:text-white text-xl font-medium">{props.message}</h2>
                </div>
            </div>
        </>
    );
}