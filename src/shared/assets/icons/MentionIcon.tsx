"use client"
import Icon from "@ant-design/icons";
import React from "react";
import {MentionSvgMeta} from './svg/mention'

const MentionSvg = () => <MentionSvgMeta />;

export const MentionIcon = props => <Icon component={MentionSvg} {...props} />;