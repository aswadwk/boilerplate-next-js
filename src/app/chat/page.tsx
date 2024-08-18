"use client";

// import InputMessage from "./InputMessage";
// import SelectModel from "./SelectModel";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { SkeletonChat } from "@/components/Skeleton/Skeleton";
import { Share } from "lucide-react";
import SelectModel from "@/components/Input/SelectModel";
import InputMessage from "@/components/Input/InputMessage";

type MessageProps = {
    role: string;
    content: { type: string; text: string }[];
};

export default function Dashboard({ chat }: any) {
    const [model, setModel] = useState(chat?.model ?? "gpt-4o");
    const [height, setHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<MessageProps[]>(
        chat?.messages ?? []
    );
    const bottomRef = useRef<any>(null);

    // const scrollToBottom = () => {
    //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    function onChangeModel(value: string) {
        setModel(value);

        // router.get(route("web.chat"), { model: value }, { replace: true });
    }

    const onSendMessage = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        // push user message to messages
        const newMsg = messages.concat({
            role: "user",
            content: [
                {
                    type: "text",
                    text: inputMessage,
                },
            ],
        });

        setMessages(newMsg);
        scrollToBottom();

        // const result = await axios.post(
        //     route("web.chat.sendMessage", chat.id),
        //     {
        //         message: inputMessage,
        //     }
        // );

        setIsLoading(false);

        // if (result.status === 200) {
        //     setInputMessage("");
        //     const newMessageResponse = result.data.message;

        //     const newMessage = {
        //         role: newMessageResponse.role,
        //         content: [
        //             {
        //                 type: newMessageResponse.content[0].type,
        //                 text: newMessageResponse.content[0].text,
        //             },
        //         ],
        //     };

        //     setMessages(newMsg.concat(newMessage));
        //     scrollToBottom();
        // }
    };

    const handleKeyPress = (event: any) => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const isSendKeyPressed =
            event.key === "Enter" && (isMac ? event.metaKey : event.ctrlKey);

        if (isSendKeyPressed) {
            event.preventDefault();
            onSendMessage(event);
        }
    };

    function scrollToBottom() {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    async function handleShareLink() {
        const url = window.location.href;

        // get id from url
        if (url.includes("/chat")) {
            const id = url.split("/").pop();
        }

        alert("Share link clicked");

        // const result = await axios.post(route("web.chat.createLink", id));

        // if (result.data.success) {
        //   // create share link
        //   console.log(result.data);
        // }

        // create share link
    }

    return (
        <DefaultLayout>
            {/* <Head title="Chat" /> */}
            <div className="relative w-full sm:w-8/12">
                <div className="flex justify-between">
                    <div className="w-3/12 mb-2 sm:w-4/12">
                        <SelectModel value={model} onChange={onChangeModel} />
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto gap-1.5 text-sm"
                        onClick={handleShareLink}
                    >
                        <Share className="size-3.5" />
                        Share
                    </Button>
                </div>
                <div className="relative min-h-[50vh] rounded-xl mb-10">
                    <div className="flex flex-col gap-2">
                        {messages.map((message: any, index: any) => (
                            <div
                                key={index}
                                className={`flex gap-4 w-full overflow-auto ${
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div className={`flex flex-col gap-2`}>
                                    {message.content.map(
                                        (content: any, index: any) => (
                                            <div
                                                key={index}
                                                className="p-4 border rounded-lg dark:bg-codeBackground"
                                            >
                                                <p
                                                    className={`flex capitalize text-xs text-muted-foreground ${
                                                        message.role === "user"
                                                            ? "justify-end"
                                                            : "justify-start"
                                                    }`}
                                                >
                                                    {message.role === "user"
                                                        ? "You"
                                                        : message.role}
                                                </p>
                                                <MarkdownPreview
                                                    source={content.text}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && <SkeletonChat />}
                        <div ref={bottomRef}></div>
                    </div>
                </div>
                <InputMessage
                    onChange={(e) => setInputMessage(e.target.value)}
                    onSubmit={(e) => onSendMessage(e)}
                    value={inputMessage}
                    onKeyDown={handleKeyPress}
                    isLoading={isLoading}
                />
            </div>
        </DefaultLayout>
    );
}
