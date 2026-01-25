"use client"

import { siteConfig } from "config/site.config";
import { usePathname } from "next/navigation"

const Title = () => {
    const pathName = usePathname();

    const currentNavItem = siteConfig.navItems.find(item => item.path === pathName);

    const title = currentNavItem ? currentNavItem.label : siteConfig.title;

    return (
        <div className="w-full py-8 px-8">
            <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h1>
        </div>
    )
}

export default Title