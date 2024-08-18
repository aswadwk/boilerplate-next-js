import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Command, CornerDownLeft, Mic, Paperclip } from "lucide-react";
import React from "react";

type InputMessageProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    isLoading?: boolean;
};

const InputMessage = ({
    onSubmit,
    onChange,
    value,
    onKeyDown,
    isLoading = false,
}: InputMessageProps) => {
    return (
        <form
            onSubmit={onSubmit}
            className="sticky bottom-0 w-full border rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring"
        >
            <Label htmlFor="message" className="sr-only">
                Message
            </Label>
            <Textarea
                id="message"
                onChange={onChange}
                placeholder="Type your message here..."
                value={value}
                className="p-3 border-0 shadow-none resize-none min-h-12 focus-visible:ring-0"
                onKeyDown={onKeyDown}
                disabled={isLoading}
            />
            <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" type="button">
                                <Paperclip className="size-4" />
                                <span className="sr-only">Attach file</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" type="button">
                                <Mic className="size-4" />
                                <span className="sr-only">Use Microphone</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            Use Microphone
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button
                    type="submit"
                    size="sm"
                    className={`ml-auto gap-1.5 ${
                        isLoading ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                >
                    Run
                    <div className="flex">
                        <Command className="size-3.5" />
                        <CornerDownLeft className="size-3.5" />
                    </div>
                </Button>
            </div>
        </form>
    );
};

export default InputMessage;
