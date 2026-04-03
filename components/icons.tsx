import { FileCodeIcon, FileIcon, FileJsonIcon } from "lucide-react"

export function getIconForLanguageExtension(language: string) {
  switch (language) {
    case "json":
      return <FileJsonIcon className="size-4" />
    case "css":
      return <FileCodeIcon className="size-4" />
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "typescript":
      return <FileCodeIcon className="size-4" />
    default:
      return <FileIcon className="size-4" />
  }
}
