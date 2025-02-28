"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe, MapPin, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import useIsMobile from "../hooks/useIsMobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const vehicleCategories = {
  "E-MOTO": [
    { name: "TC WANDERER PRO", image: "/tc-wanderer-pro.png" },
    { name: "TC MAX", image: "/tc-max.png" },
    { name: "STASH", image: "/stash.png" },
    { name: "TS STREET HUNTER PRO", image: "/ts-street-hunter.png" },
    { name: "ON-R", image: "/on-r.png" },
    { name: "OFF-R", image: "/off-r.png" },
  ],
  "E-SCOOTER": [
    { name: "CUX PRO", image: "/cux-pro.png" },
    { name: "CITI", image: "/citi.png" },
    { name: "CPX", image: "/cpx.png" },
    { name: "CPX PRO", image: "/cpx-pro.png" },
    { name: "CPX EXPLORER", image: "/cpx-explorer.png" },
  ],
  "E-FLEET": [
    { name: "VS1", image: "/vs1.png" },
    { name: "VS2 CITI", image: "/vs2-citi.png" },
    { name: "VS3", image: "/vs3.png" },
    { name: "CPX-D", image: "/cpx-d.png" },
    { name: "CUX PRO", image: "/cux-pro-fleet.png" },
  ],
};

const business = [
  {
    title: "Fleet Solutions",
    href: "/business/fleet",
    description: "Electric vehicle fleet management for businesses.",
  },
  {
    title: "Dealerships",
    href: "/business/dealerships",
    description: "Join our growing network of VMOTO dealerships.",
  },
];

const discover = [
  {
    title: "Technology",
    href: "/discover/technology",
    description: "Explore our cutting-edge electric vehicle technology.",
  },
  {
    title: "Sustainability",
    href: "/discover/sustainability",
    description: "Our commitment to a sustainable future.",
  },
];

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [lastScrollPosition, setLastScrollPosition] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(lastScrollPosition < window.scrollY);
      setLastScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed left-1/2 dark -translate-x-1/2 top-10 z-50 max-w-7xl w-full bg-black/90 rounded-lg backdrop-blur-sm transition-all",
        isScrolling ? "-translate-y-24" : "translate-y-0"
      )}
    >
      <div className="container flex h-20 justify-between items-center px-4">
        <Link href="/" className="w-44 h-44 relative">
          <Image fill src="/logo.png" className="object-contain" alt="VMOTO" />
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center">
          <NavigationMenu className="hidden  lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem className="!left-[-2rem]">
                <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setTimeout(() => setOpen(false), 300)}
                      variant="ghost"
                      size="sm"
                      className="flex hover:bg-transparent items-center text-sm gap-2 text-white"
                    >
                      Vehicles{" "}
                      <ChevronDown
                        className={`relative !bg-transparent top-[1px] ml-1 h-3 w-3 transition duration-300 
                          ${open && "rotate-180"}`}
                        aria-hidden="true"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="">
                    <div className="w-[900px]  bg-white p-6">
                      {Object.entries(vehicleCategories).map(([category, vehicles]) => (
                        <div key={category} className="mb-8 last:mb-0">
                          <div className="flex items-center gap-2 mb-4">
                            <Image
                              src="/vmoto-logo-small.png"
                              alt="VMOTO"
                              width={24}
                              height={24}
                              className="opacity-50"
                            />
                            <span className="text-sm ">{category}</span>
                          </div>
                          <div className="grid grid-cols-6 gap-6">
                            {vehicles.map((vehicle) => (
                              <Link
                                key={vehicle.name}
                                href={`/vehicles/${vehicle.name.toLowerCase().replace(/\s+/g, "-")}`}
                                className="group"
                              >
                                <div className="aspect-square relative mb-2">
                                  <Image
                                    src={vehicle.image || "/placeholder.svg"}
                                    alt={vehicle.name}
                                    fill
                                    className="object-contain transition-transform group-hover:scale-105"
                                  />
                                </div>
                                <p className="text-xs text-center font-medium">{vehicle.name}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Business</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {business.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {discover.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/partnership" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Partnership & Testimonials
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contacts" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contacts</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
              <Button variant="ghost" size="icon" className="">
                <MapPin className="h-5 w-5" />
                <span className="sr-only">Location</span>
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-black/95 ">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/vehicles"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Vehicles
                  </Link>
                  <Link
                    href="/business"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Business
                  </Link>
                  <Link
                    href="/discover"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Discover
                  </Link>
                  <Link
                    href="/partnership"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Partnership & Testimonials
                  </Link>
                  <Link
                    href="/contacts"
                    className="text-lg font-medium hover:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Contacts
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
