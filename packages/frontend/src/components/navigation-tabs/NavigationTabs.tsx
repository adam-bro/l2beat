import React, { ReactNode } from 'react'

import { DesktopTabs } from './DesktopTabs'
import { MobileTabs } from './MobileTabs'

export interface NavigationPage {
  fullTitle: ReactNode
  shortTitle: ReactNode
  icon?: ReactNode
  link: string
  selected: boolean
  new?: boolean
}

export interface PageSelectionProps {
  pages: NavigationPage[]
}

export function NavigationTabs({ pages }: PageSelectionProps) {
  return (
    <nav className="md:mt-10 font-base">
      <DesktopTabs pages={pages} />
      <MobileTabs pages={pages} />
    </nav>
  )
}
