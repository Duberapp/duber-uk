'use client'

import styled from "styled-components";
import { Space } from "../../utils/Theme";
import { Flex } from "../Layout";

export const Container = styled(Flex)`
  align-items: center;

  button:not(:last-child) {
    margin-right: ${Space.S};
  }
`;
