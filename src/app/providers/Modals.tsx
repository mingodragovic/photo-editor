"use client"

import LoginModal from "@/components/modals/LoginModal";
import PlansModal from "@/components/modals/PlansModal";
import { useEffect, useState } from "react";

const Modals = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;
  return (
    <>
    <LoginModal/>
    <PlansModal/>
    </>
  )
}

export default Modals