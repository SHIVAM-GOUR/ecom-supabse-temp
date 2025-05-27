import { hasEnvVars } from "@/utils/supabase/check-env-vars"
import { EnvVarWarning } from "../../env-var-warning"
import HeaderAuth from "@/components/header-auth"
import { ThemeSwitcher } from "@/components/theme-switcher"

export const Navbar = () => {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <h1 className="text-2xl">GroowByTech</h1>
                </div>
                <div className="flex">
                    <span className="mx-1"><ThemeSwitcher /></span>
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
            </div>
        </nav>
    )
}