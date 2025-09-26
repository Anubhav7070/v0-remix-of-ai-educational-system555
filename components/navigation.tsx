"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  BookOpen,
  BarChart3,
  Camera,
  Settings,
  Menu,
  X,
  GraduationCap,
  TrendingUp,
  Clock,
  Calendar,
  User,
  Users,
  Database,
  Sparkles,
  FileText,
} from "lucide-react"
import { NotificationCenter } from "@/components/notification-center"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: Brain, label: "ML Framework", href: "/", active: pathname === "/" },
    { icon: User, label: "Student", href: "/student", active: pathname === "/student" },
    { icon: BarChart3, label: "Dashboard", href: "/dashboard", active: pathname === "/dashboard" },
    { icon: TrendingUp, label: "EDA", href: "/eda", active: pathname === "/eda" },
    { icon: Database, label: "AI Dataset", href: "/ai-dataset", active: pathname === "/ai-dataset" },
    { icon: Camera, label: "Attendance", href: "/attendance", active: pathname === "/attendance" },
    { icon: GraduationCap, label: "Teacher", href: "/teacher", active: pathname === "/teacher" },
    { icon: Users, label: "Professors", href: "/professors", active: pathname === "/professors" },
    { icon: Sparkles, label: "AI Analyzer", href: "/ai-analyzer", active: pathname === "/ai-analyzer" },
    { icon: BookOpen, label: "Curriculum", href: "/curriculum", active: pathname === "/curriculum" },
    { icon: Clock, label: "Timetable", href: "/timetable", active: pathname === "/timetable" },
    { icon: FileText, label: "Patent Analysis", href: "/patent-analysis", active: pathname === "/patent-analysis" },
    { icon: Calendar, label: "Calendar", href: "/calendar", active: pathname === "/calendar" },
    { icon: Settings, label: "Settings", href: "/settings", active: pathname === "/settings" },
  ]

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EduAI</span>
            <Badge variant="secondary" className="ml-2">
              Beta
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button key={item.label} variant={item.active ? "default" : "ghost"} size="sm" className="gap-2" asChild>
                <Link href={item.href}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
            <NotificationCenter />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <NotificationCenter />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className="gap-2 justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
