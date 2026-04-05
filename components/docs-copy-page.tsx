"use client";

import { CheckIcon, ChevronDownIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  ChatGptIcon,
  ClaudeIcon,
  MarkdownDocIcon,
  SciraIcon,
  V0Icon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useClipboard } from "@/hooks/use-clipboard";

const getPromptUrl = (baseURL: string, url: string) =>
  `${baseURL}?q=${encodeURIComponent(
    `I'm looking at this termcn documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.
`
  )}`;

const MENU_ITEMS: [string, (url: string) => React.ReactNode][] = [
  [
    "markdown",
    (url) => (
      <a href={`${url}.mdx`} rel="noopener noreferrer" target="_blank">
        <MarkdownDocIcon />
        View as Markdown
      </a>
    ),
  ],
  [
    "v0",
    (url) => (
      <a
        href={getPromptUrl("https://v0.dev", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <V0Icon />
        <span className="-translate-x-[2px]">Open in v0</span>
      </a>
    ),
  ],
  [
    "chatgpt",
    (url) => (
      <a
        href={getPromptUrl("https://chatgpt.com", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ChatGptIcon />
        Open in ChatGPT
      </a>
    ),
  ],
  [
    "claude",
    (url) => (
      <a
        href={getPromptUrl("https://claude.ai/new", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ClaudeIcon />
        Open in Claude
      </a>
    ),
  ],
  [
    "scira",
    (url) => (
      <a
        className="m-0 p-0"
        href={getPromptUrl("https://scira.ai/", url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <SciraIcon />
        Open in Scira
      </a>
    ),
  ],
];

export const DocsCopyPage = ({ page, url }: { page: string; url: string }) => {
  const { write } = useClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    const id = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(id);
  }, [isCopied]);

  const handleCopyPage = useCallback(async () => {
    await write(page);
    setIsCopied(true);
  }, [page, write]);

  const trigger = (
    <Button
      variant="secondary"
      size="sm"
      className="peer -ml-0.5 size-8 md:size-7 md:text-[0.8rem]"
    >
      <ChevronDownIcon className="rotate-180 sm:rotate-0" />
    </Button>
  );

  return (
    <Popover>
      <div className="group/buttons relative flex rounded-lg bg-secondary *:data-[slot=button]:focus-visible:relative *:data-[slot=button]:focus-visible:z-10">
        <PopoverAnchor />
        <Button
          variant="secondary"
          size="sm"
          className="md:h-7 md:text-[0.8rem]"
          onClick={handleCopyPage}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
          Copy Page
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden sm:flex">
            {trigger}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="animate-none! rounded-lg shadow-none"
          >
            {MENU_ITEMS.map(([key, render]) => (
              <DropdownMenuItem key={key} asChild>
                {render(url)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator
          orientation="vertical"
          className="absolute top-1 right-8 z-0 h-6! bg-foreground/5! peer-focus-visible:opacity-0 sm:right-7 sm:h-5!"
        />
        <PopoverTrigger asChild className="flex sm:hidden">
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          className="w-52 origin-center! rounded-lg bg-background/70 p-1 shadow-none backdrop-blur-sm dark:bg-background/60"
          align="start"
        >
          {MENU_ITEMS.map(([key, render]) => (
            <Button
              variant="ghost"
              size="lg"
              asChild
              key={key}
              className="w-full justify-start text-base font-normal *:[svg]:text-muted-foreground"
            >
              {render(url)}
            </Button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
};
