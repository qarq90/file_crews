import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Label from "@/components/ui/label";

type CrewFooterProps = {
    crew_id: string;
    showCreate?: boolean;
    showUpload?: boolean;
};

export function CrewFooter({ crew_id, showCreate = true, showUpload = true }: CrewFooterProps) {
    const router = useRouter();

    const routeHandler = (path: string) => {
        router.push(path);
    };

    const noButtons = !showCreate && !showUpload;

    if (noButtons) return null;

    return (
        <div className="flex w-1/3 flex-col items-center justify-center gap-4">
            <div className="text-center">
                <Label className="text-sm">Create a new file to share with your crew.</Label>
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
                {showCreate && (
                    <Button onClick={() => routeHandler(`/crew/${crew_id}/file/create`)}>
                        Create File
                    </Button>
                )}
                {showUpload && (
                    <Button onClick={() => routeHandler(`/crew/${crew_id}/file/upload`)}>
                        Upload File
                    </Button>
                )}
            </div>
            <div className="h-16 w-full" />
        </div>
    );
}
