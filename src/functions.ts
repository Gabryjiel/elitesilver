import { useRouter } from "next/router";

export function goTo(path: string){
    const router = useRouter();
    router.push(path);
}