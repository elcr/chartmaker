import React, { FC } from 'react'
import { cx } from 'emotion'

import { SidebarGroupProps } from '@/components/SidebarGroup'


export const SidebarGroup: FC<SidebarGroupProps> = ({ children, className }) => {
    className = cx('mock-sidebar-group', className)
    return (
        <div className={className}>
            {children}
        </div>
    )
}
