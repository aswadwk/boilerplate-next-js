import { diffDayNow, toYearMonthDayHourMinute } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

type ChatListProps = {
    items: any[];
};

export const ChatList = ({ items }: ChatListProps) => {
    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 pt-4">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/chat/${item.id}`}
                        className="flex flex-col items-start gap-2 p-3 text-sm text-left transition-all border rounded-lg hover:bg-accent"
                    >
                        <div className="flex flex-col w-full gap-1">
                            <div className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <div className="font-semibold">
                                        {item.title}
                                    </div>
                                </div>
                                <div className="ml-auto text-xs">
                                    {diffDayNow(item.created_at)}
                                </div>
                            </div>
                            <div className="text-xs font-medium">
                                {item.model}
                            </div>
                        </div>
                        <div className="text-xs line-clamp-2 text-muted-foreground">
                            {toYearMonthDayHourMinute(item.created_at)}
                        </div>
                    </Link>
                ))}
            </div>
        </ScrollArea>
    );
};

export default ChatList;
