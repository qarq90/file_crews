import Link from "next/link"
import Button from "../ui/button"
import Label from "../ui/label"

export function Footer() {
    return (
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4">
            <div className="text-center">
                <Label className="text-sm">
                    Create a new crew to collaborate and share files effortlessly.
                </Label>
            </div>
            <Link href="/crews/new">
                <Button>Create Crew</Button>
            </Link>
        </div>
    )
}