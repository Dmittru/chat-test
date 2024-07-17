"use client"
import Icon from "@ant-design/icons";
import React from "react";
import {PaperAirplaneMetaSvg} from './svg/paper-airplane'

const PaperPlaneSvg = () => <PaperAirplaneMetaSvg />;

export const PaperPlaneIcon = props => <Icon component={PaperPlaneSvg} {...props} />;