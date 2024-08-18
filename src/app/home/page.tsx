"use client";

import DefaultLayout from "@/components/Layout/DefaultLayout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import ChatList from "./ChatList";

const Home = () => {
    const [filters, setFilters] = React.useState({ q: "" });
    const [chat, setChat] = React.useState([]);

    return (
        <DefaultLayout>
            <div className="relative w-full sm:w-6/12">
                <form className="w-full">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search"
                            className="pl-8"
                            onChange={(e) =>
                                setFilters({ ...filters, q: e.target.value })
                            }
                        />
                    </div>
                    <ChatList items={chat} />
                </form>
            </div>
        </DefaultLayout>
    );
};

export default Home;
