'use client'
import React from 'react';
import useStore from "@/hooks/useStore";
import '../../shared/styles/themes/dark.scss'
import '../../shared/styles/themes/light.scss'

interface props{
    children: React.ReactNode;
}
export const SwitchTheme = ({children}:props) => {
    const {theme} = useStore()
    return (
        <div className={theme ? theme : 'light'}>
            {children}
        </div>
    );
};
