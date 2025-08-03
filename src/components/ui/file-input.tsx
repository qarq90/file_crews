import clsx from "clsx"
import * as React from "react"
import { LuUpload } from "react-icons/lu"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    description?: string
    supportedFormats?: string
    handleFiles: (files: File[]) => void
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
    ({ className, label = "Click to upload or drag and drop", description = ".pdf, .png, .jpeg, .jpg, .docx, .txt, .pptx, .xlsx, .md, .js, .py, .html, .css, .jsx, .tsx, .java., .c, .cpp, .cs", supportedFormats, handleFiles, ...props }, ref) => {

        const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                handleFiles(Array.from(e.target.files));
            }
        };

        return (
            <div className="flex items-center justify-center my-8 w-full bg-foreground/10 rounded-md">
                <label
                    htmlFor={props.id}
                    className={clsx(
                        "flex flex-col items-center justify-center w-full h-80 rounded-lg cursor-pointer",
                        "border-border hover:bg-accent/10",
                        "transition-colors duration-200 ease-in-out",
                        className
                    )}
                >
                    <div className="flex flex-col items-center justify-center py-6">
                        <LuUpload className="w-8 h-8 mb-4" />
                        <p className="mb-2 text-sm">
                            <span className="font-semibold">{label}</span>
                        </p>
                        <p className="text-xs">
                            {supportedFormats || description}
                        </p>
                    </div>
                    <input
                        ref={ref}
                        multiple
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpeg,.jpg,.docx,.txt,.pptx,.xlsx,.md,.js,.py,.html,.css,.jsx,.tsx,.java,.c,.cpp,.cs"
                        onChange={onFileChange}
                        {...props}
                    />
                </label>
            </div>
        )
    }
)

FileUpload.displayName = "FileUpload"

export { FileUpload }