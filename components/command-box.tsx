"use client"

import { CopyButton } from "@/components/copy-button"

interface CommandBoxProps {
  command: string
}

export function CommandBox({ command }: CommandBoxProps) {
  return (
    <div className="group relative flex w-full max-w-2xl items-center px-4">
      <div className="flex h-12 w-full items-center gap-3 rounded-full border border-zinc-200 bg-zinc-100/80 px-5 backdrop-blur-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
        <span className="select-none font-mono text-sm text-zinc-500">$</span>
        <code className="no-scrollbar flex-1 overflow-x-auto whitespace-nowrap text-left font-mono text-sm text-zinc-700 dark:text-zinc-300">
          {command}
        </code>
        <CopyButton
          value={command}
          className="static size-7 shrink-0 bg-transparent"
        />
      </div>
    </div>
  )
}
