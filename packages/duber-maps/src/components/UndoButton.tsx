'use client'

import React from "react";
import UndoIcon from "../images/svg/undo.inline.svg";
import { rem } from "polished";
import { Color } from "../utils/Theme";
import { Flex } from "./Layout";
import Image from "next/image";
import { DRAW_ICON_SIZES } from "../utils/constants";

type Props = {
  onClick: () => void,
};

const BUTTON_SIZE = rem(40);

export function UndoButton({ onClick }: Props) {
  return (
    <Flex
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
      width={BUTTON_SIZE}
      height={BUTTON_SIZE}
      bg={Color.White}
    >
      {/* <UndoIcon cursor="pointer" /> */}
      <div className="cursor-pointer">
        <Image
          src={UndoIcon}
          width={DRAW_ICON_SIZES.width}
          height={DRAW_ICON_SIZES.height}
          alt="undo-icon"
        />
      </div>
    </Flex>
  );
}