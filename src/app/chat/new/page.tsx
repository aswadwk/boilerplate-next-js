"use client";

// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { Head, router } from "@inertiajs/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import SelectModel from "@/components/Input/SelectModel";
import InputMessage from "@/components/Input/InputMessage";
import { isBrowser } from "@/lib/utils";

type MessageProps = {
    role: string;
    content: { type: string; text: string }[];
};

function getValueQuery(key: string) {
    if (!isBrowser()) return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

export default function Dashboard({ chat }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [model, setModel] = useState(getValueQuery("model") ?? "gpt-4o");
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<MessageProps[]>(
        chat?.messages ?? []
    );

    function onChangeModel(value: string) {
        setModel(value);

        // router.get(route("web.chat"), { model: value }, { replace: true });
    }

    const onSendMessage = (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        // router.post(route("web.chat.newConversation"), {
        //     model: model,
        //     message: inputMessage,
        // });
    };

    useEffect(() => {
        // return
    }, []);

    const handleKeyPress = (event: any) => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const isSendKeyPressed =
            event.key === "Enter" && (isMac ? event.metaKey : event.ctrlKey);

        if (isSendKeyPressed) {
            event.preventDefault();
            onSendMessage(event);
        }
    };

    return (
        <DefaultLayout>
            {/* <Head title="New Chat" /> */}
            <div className="relative w-full sm:w-8/12">
                <div className="w-4/12 mb-2">
                    <SelectModel value={model} onChange={onChangeModel} />
                </div>
                <div className="relative min-h-[50vh] rounded-xl p-2 mb-10">
                    <div className="flex flex-col gap-2">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{ whiteSpace: "pre-wrap" }}
                                className={`flex gap-4 w-full overflow-auto ${
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`flex flex-col gap-2${
                                        message.role === "user"
                                            ? "bg-primary text-white"
                                            : "bg-background"
                                    }`}
                                >
                                    {message.content.map((content, index) => (
                                        <div key={index}>
                                            <MarkdownPreview
                                                style={{
                                                    padding: 16,
                                                    borderRadius: 8,
                                                }}
                                                source={content.text}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <InputMessage
                    onChange={(e) => setInputMessage(e.target.value)}
                    onSubmit={(e) => onSendMessage(e)}
                    // onSubmit={(e) => fetchStreamData(e, inputMessage)}
                    value={inputMessage}
                    onKeyDown={handleKeyPress}
                    isLoading={isLoading}
                />
            </div>
        </DefaultLayout>
    );
}
