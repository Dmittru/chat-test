'use client'
import React from 'react';
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {IUser} from "@/shared/types";

interface props {
    members: string
}

export const AvatarGroupClient = ({members}: props) => {
    const badRequest = (
        <p className={'chat-header__title'}>
            No members
        </p>
    )
    if (!members) return badRequest;
    const membersParsed = JSON.parse(members) as IUser[];
    if (!membersParsed) return badRequest

    const MAX_AVATARS = {
        count: 3,
    }
    return (
        <>
            <Avatar.Group max={MAX_AVATARS} size={26}>
                {membersParsed.map((user, key) => {
                    return (
                        <Avatar
                            key={`avatar-${user.id}`}
                            size={26}
                            src={user.avatar}
                            icon={<UserOutlined/>}
                            alt={user?.nickname[0] || "X"}
                        />
                    )
                })}
            </Avatar.Group>
        </>
    );
};