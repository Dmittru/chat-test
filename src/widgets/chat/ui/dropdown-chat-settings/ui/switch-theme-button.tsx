import React from 'react';
import {MoonOutlined, SunOutlined} from "@ant-design/icons";
import {Button} from "antd";
import useStore from "@/hooks/useStore";

export const SwitchThemeButton = () => {
    const {theme, switchTheme} = useStore();

    return (
        <Button
            rel="noopener noreferrer"
            className={'button-ghost dropdown-menu__item'}
            onClick={() => {
                switchTheme();
            }}
        >
            {theme === 'light' ?
                "Switch to dark" :
                theme === 'dark' ?
                    "Switch to light" :
                    "Switch to dark"
            }
            {theme === 'light' ?
                <MoonOutlined/> :
                theme === 'dark' ?
                    <SunOutlined/> :
                    <MoonOutlined/>
            }
        </Button>
    );
};