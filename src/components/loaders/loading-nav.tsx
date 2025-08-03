import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { Processing } from "@/components/loaders/processing";
import Button from "@/components/ui/button";

export function LoadingNav() {
    return (
        <main>
            <nav className="flex flex-row justify-between items-center">
                <section className="flex flex-row gap-4">
                    <Link
                        href={`/crews`}
                        className="fixed bottom-5 opacity-50 left-5 flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 text-xl text-background transition duration-200 ease-in-out hover:opacity-85 disabled:opacity-50 md:relative md:bottom-auto md:left-0 md:right-auto md:top-0 md:mt-0 md:transform-none"
                    >
                        <FaArrowLeft />
                    </Link>
                    <div className="bg-foreground w-12 h-12 rounded-full animate-pulse" />
                </section>
                <section className="flex flex-row gap-4 w-1/4">
                    <Button disabled={true}>Edit</Button>
                    <Button disabled={true}>Logout</Button>
                </section>
            </nav>
            <Processing />
        </main>
    )
}