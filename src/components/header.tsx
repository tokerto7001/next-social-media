import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
} from '@nextui-org/react'
import HeaderAuth from '@/components/header-auth';
import SearchInput from "@/components/search-input";
import { Suspense } from "react";

export default function Header(){

    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link className="font-bold" href='/'>Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Suspense>
                        <SearchInput />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}